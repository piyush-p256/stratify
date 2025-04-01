"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

const DatePicker = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="startDate">Start Date</Label>
      <Input id="startDate" type="date" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export default DatePicker

