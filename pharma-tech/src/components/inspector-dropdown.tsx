"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

type Inspector = {
  id: string
  nombre: string
}

interface InspectorDropdownProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function InspectorDropdown({ value, onChange, className }: InspectorDropdownProps) {
  const [open, setOpen] = useState(false)
  const [inspectores, setInspectores] = useState<Inspector[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInspectores = async () => {
      try {
        const response = await fetch("/api/inspectores")
        const data = await response.json()
        setInspectores(data)
      } catch (error) {
        console.error("Error al cargar inspectores:", error)
        // Datos de ejemplo en caso de error
        setInspectores([
          { id: "1", nombre: "Juan Pérez" },
          { id: "2", nombre: "María González" },
          { id: "3", nombre: "Carlos Rodríguez" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchInspectores()
  }, [])

  const selectedInspector = inspectores.find((inspector) => inspector.id === value)
  const displayValue = selectedInspector ? selectedInspector.nombre : ""

  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Inspector
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
            {value ? displayValue : "Seleccionar inspector"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[200px]">
          {isLoading ? (
            <div className="p-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <Command>
              <CommandInput placeholder="Buscar inspector..." />
              <CommandList>
                <CommandEmpty>No se encontraron inspectores.</CommandEmpty>
                <CommandGroup>
                  {inspectores.map((inspector) => (
                    <CommandItem
                      key={inspector.id}
                      value={inspector.id}
                      onSelect={(currentValue : any) => {
                        onChange(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === inspector.id ? "opacity-100" : "opacity-0")} />
                      {inspector.nombre}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
