"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepId: number) => void
  allowSkip?: boolean
}

export function Stepper({ steps, currentStep, onStepClick, allowSkip = false }: StepperProps) {
  return (
    <div className="w-full">
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => {
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep
            const isClickable = allowSkip || isCompleted || isCurrent

            return (
              <li key={step.id} className={cn("relative", stepIdx !== steps.length - 1 && "pr-8 sm:pr-20")}>
                {/* Connector line */}
                {stepIdx !== steps.length - 1 && (
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div
                      className={cn(
                        "h-0.5 w-full",
                        isCompleted ? "bg-primary" : "bg-muted"
                      )}
                    />
                  </div>
                )}

                {/* Step button */}
                <button
                  type="button"
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-background text-primary",
                    !isCompleted && !isCurrent && "border-muted bg-background text-muted-foreground",
                    isClickable && "cursor-pointer hover:border-primary",
                    !isClickable && "cursor-not-allowed"
                  )}
                  onClick={() => isClickable && onStepClick?.(step.id)}
                  disabled={!isClickable}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </button>

                {/* Step details */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-sm font-medium whitespace-nowrap",
                        isCurrent && "text-primary",
                        isCompleted && "text-foreground",
                        !isCompleted && !isCurrent && "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}