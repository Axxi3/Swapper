import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

export function AlertBanner(props) {
  return (
    <>
      <div className={`rounded-md border-l-4 border-black p-4  z-99 relative top-0 left-0 ${
  props.status === "error" ? (
    "bg-red-600" // Apply class directly
  ) : props.status === "success" ? (
    "bg-green-600" // Apply class directly
  ) : (
    "bg-gray-100" // Empty string if none of the conditions match
  )
}`}>
        <div className="flex items-center justify-between space-x-4">
          <div>
            {
             props.status === "error" ? (
                <AlertTriangle className="h-6 w-6 text-red-600" />
              ) : props.status === "success" ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                
              ) : (
                <Info className="h-6 w-6" />
              )
              
            }
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">
              This is some informational text that you can use to show some alert content
            </p>
          </div>
          <div>
            <X className="h-6 w-6 cursor-pointer text-red-600" />
          </div>
        </div>
      </div>
    </>
  )
}
