import { useEffect, useRef, useState } from "react"
import {
  Check,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function App() {
  // Student name state
  const [studentName, setStudentName] = useState("")

  // Attendance starts from 0
  const [attendance, setAttendance] = useState(0)

  // Reference for the student name input
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Update browser title whenever attendance changes
  useEffect(() => {
    document.title = `Attendance: ${attendance}`
  }, [attendance])

  // Increase attendance
  const handlePresent = () => {
    setAttendance((previousAttendance) => previousAttendance + 1)
  }

  // Decrease attendance, but never below 0
  const handleRemove = () => {
    setAttendance((previousAttendance) =>
      Math.max(0, previousAttendance - 1)
    )
  }

  // Reset attendance
  const handleReset = () => {
    setAttendance(0)
  }

  // Focus Student Name input using useRef
  const handleFocusStudentName = () => {
    nameInputRef.current?.focus()
  }

  // Message based on attendance
  const getAttendanceMessage = () => {
    if (attendance === 0) {
      return "No attendance recorded"
    }

    if (attendance >= 1 && attendance <= 4) {
      return "Attendance in progress"
    }

    return "Good Attendance ⭐"
  }

  // Status label
  const getStatus = () => {
    if (attendance === 0) return "Not Started"
    if (attendance < 5) return "In Progress"
    return "Excellent"
  }

  // Progress is complete at 5 attendance
  const progress = Math.min((attendance / 5) * 100, 100)

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-100 via-white to-cyan-100 px-4 py-10">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <Card className="w-full max-w-2xl overflow-hidden border-white/70 bg-white/85 shadow-2xl shadow-violet-200/50 backdrop-blur-xl">
          {/* Top gradient */}
          <div className="h-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />

          <CardHeader className="space-y-4 px-6 pt-8 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-3xl shadow-lg shadow-violet-200">
              🎓
            </div>

            <div>
              <Badge
                variant="secondary"
                className="mb-3 rounded-full px-4 py-1"
              >
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Student Dashboard
              </Badge>

              <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">
                Attendance Tracker
              </CardTitle>

              <CardDescription className="mt-2 text-base">
                Keep track of your student's attendance with ease.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-7 px-6 pb-8 sm:px-10">
            {/* Student Name */}
            <div className="space-y-3">
              <label
                htmlFor="student-name"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <UserRound className="h-4 w-4 text-violet-600" />
                Student Name
              </label>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="student-name"
                  ref={nameInputRef}
                  value={studentName}
                  onChange={(event) => setStudentName(event.target.value)}
                  placeholder="Enter student name..."
                  className="h-11 flex-1"
                />

                <Button
                  type="button"
                  variant="outline"
                  className="h-11"
                  onClick={handleFocusStudentName}
                >
                  Focus Student Name
                </Button>
              </div>
            </div>

            {/* Student welcome */}
            {studentName.trim() && (
              <div className="flex items-center gap-3 rounded-xl border bg-violet-50/70 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
                  {studentName.trim().charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Tracking attendance for
                  </p>
                  <p className="font-semibold">{studentName}</p>
                </div>
              </div>
            )}

            {/* Attendance display */}
            <div className="rounded-3xl border bg-gradient-to-br from-slate-50 to-violet-50 p-6 text-center shadow-inner sm:p-8">
              <div className="mb-3 flex items-center justify-center gap-2">
                <Target className="h-4 w-4 text-violet-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  TOTAL ATTENDANCE
                </span>
              </div>

              <div className="text-7xl font-black tracking-tight text-violet-700 sm:text-8xl">
                {attendance}
              </div>

              <div className="mt-4">
                <Badge
                  variant={attendance >= 5 ? "default" : "secondary"}
                  className="rounded-full px-4 py-1"
                >
                  {attendance >= 5 && <Check className="mr-1 h-3.5 w-3.5" />}
                  {getStatus()}
                </Badge>
              </div>

              <p className="mt-4 text-base font-medium">
                {getAttendanceMessage()}
              </p>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.min(attendance, 5)} / 5</span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Attendance controls */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                onClick={handlePresent}
                className="h-12 text-base font-semibold"
              >
                <Plus className="mr-2 h-5 w-5" />
                Present +
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleRemove}
                disabled={attendance === 0}
                className="h-12 text-base font-semibold"
              >
                <Minus className="mr-2 h-5 w-5" />
                Remove -
              </Button>
            </div>

            {/* Reset */}
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className="h-11 w-full text-muted-foreground"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Attendance
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Goal: Reach 5 attendances for a ⭐ Good Attendance status
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default App