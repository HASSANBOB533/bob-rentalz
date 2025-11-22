import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';
import { StatusBadge } from '../components/StatusBadge';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Checkbox } from '../components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';

// Define interface for Viewing
interface Viewing {
  id: number;
  date: Date;
  dateStr: string; // e.g. "Thu, Feb 22"
  time: string;
  tenantName: string;
  propertyTitle: string;
  referenceCode: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  avatar: string;
  propertyId: number;
  notes?: string;
  attended?: boolean;
  cancellationReason?: string;
}

export default function AgentViewingsPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2024, 1, 22)); // Feb 22, 2024

  // Modal States
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedViewing, setSelectedViewing] = useState<Viewing | null>(null);

  // Form States
  const [completionNotes, setCompletionNotes] = useState('');
  const [tenantAttended, setTenantAttended] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  // Initial Mock Data
  const [viewings, setViewings] = useState<Viewing[]>([
    {
      id: 1,
      date: new Date(2024, 1, 22), // Feb 22, 2024
      dateStr: 'Thu, Feb 22',
      time: '3:00 PM',
      tenantName: 'Mohamed Hassan',
      propertyTitle: 'Modern 2BR Apartment in New Cairo',
      referenceCode: 'BOB-NC-APT-1023-R2 • X7PM3C',
      status: 'Scheduled',
      avatar: 'https://i.pravatar.cc/150?img=12',
      propertyId: 1,
    },
    {
      id: 2,
      date: new Date(2024, 1, 23), // Feb 23, 2024
      dateStr: 'Fri, Feb 23',
      time: '11:00 AM',
      tenantName: 'Sara Ibrahim',
      propertyTitle: 'Luxury Villa with Private Pool',
      referenceCode: 'BOB-MD-VIL-0041-R1 • LQ9X7P',
      status: 'Confirmed',
      avatar: 'https://i.pravatar.cc/150?img=23',
      propertyId: 2,
    },
    {
      id: 4,
      date: new Date(2024, 1, 23), // Feb 23, 2024
      dateStr: 'Fri, Feb 23',
      time: '3:00 PM',
      tenantName: 'Nadia Mahmoud',
      propertyTitle: 'Spacious 3BR Penthouse',
      referenceCode: 'BOB-MD-PNT-0512-R1 • K2MN8V',
      status: 'Confirmed',
      avatar: 'https://i.pravatar.cc/150?img=45',
      propertyId: 4,
    },
    {
      id: 7,
      date: new Date(2024, 1, 24), // Feb 24, 2024
      dateStr: 'Sat, Feb 24',
      time: '10:00 AM',
      tenantName: 'Omar Said',
      propertyTitle: 'Garden View Apartment',
      referenceCode: 'BOB-NC-APT-0782-R3 • Y8QN6B',
      status: 'Scheduled',
      avatar: 'https://i.pravatar.cc/150?img=14',
      propertyId: 7,
    },
    {
      id: 8,
      date: new Date(2024, 1, 24), // Feb 24, 2024
      dateStr: 'Sat, Feb 24',
      time: '2:00 PM',
      tenantName: 'Fatima Youssef',
      propertyTitle: 'Luxury 4BR Villa',
      referenceCode: 'BOB-SZ-VIL-0234-R1 • A3FK7D',
      status: 'Confirmed',
      avatar: 'https://i.pravatar.cc/150?img=29',
      propertyId: 8,
    },
    // Past/Completed Viewings (Dates normalized for calendar display if needed, though past)
    {
      id: 10,
      date: new Date(2024, 1, 19),
      dateStr: 'Mon, Feb 19',
      time: '4:00 PM',
      tenantName: 'Hassan Ali',
      propertyTitle: 'Family Apartment in October City',
      referenceCode: 'BOB-O6-APT-2331-R3 • P7HZ9Q',
      status: 'Completed',
      avatar: 'https://i.pravatar.cc/150?img=33',
      propertyId: 3,
      notes: 'Tenant was very interested. Asked about parking.',
    },
    {
      id: 11,
      date: new Date(2024, 1, 18),
      dateStr: 'Sun, Feb 18',
      time: '1:00 PM',
      tenantName: 'Ahmed Khalil',
      propertyTitle: 'Modern Loft in Zamalek',
      referenceCode: 'BOB-ZM-LFT-0891-R2 • T5WX4R',
      status: 'Completed',
      avatar: 'https://i.pravatar.cc/150?img=51',
      propertyId: 5,
      notes: 'Completed viewing.',
    },
    {
      id: 12,
      date: new Date(2024, 1, 17),
      dateStr: 'Sat, Feb 17',
      time: '11:00 AM',
      tenantName: 'Layla Fouad',
      propertyTitle: 'Cozy Studio Downtown',
      referenceCode: 'BOB-DT-STD-1457-R1 • M9PL2K',
      status: 'Cancelled',
      avatar: 'https://i.pravatar.cc/150?img=26',
      propertyId: 6,
      cancellationReason: 'Tenant rescheduled.',
    },
  ]);

  // Derived Stats
  const upcomingCount = viewings.filter(
    (v) => v.status === 'Scheduled' || v.status === 'Confirmed',
  ).length;
  const completedCount = viewings.filter((v) => v.status === 'Completed').length;
  const cancelledCount = viewings.filter((v) => v.status === 'Cancelled').length;

  // Get dates with viewings
  const datesWithViewings = viewings.map((v) => v.date);

  // Filter viewings for calendar
  const calendarViewings = selectedDate
    ? viewings.filter(
        (viewing) =>
          viewing.date.getDate() === selectedDate.getDate() &&
          viewing.date.getMonth() === selectedDate.getMonth() &&
          viewing.date.getFullYear() === selectedDate.getFullYear(),
      )
    : [];

  // Actions
  const handleConfirm = (id: number) => {
    setViewings((prev) => prev.map((v) => (v.id === id ? { ...v, status: 'Confirmed' } : v)));
    toast.success('Viewing confirmed');
  };

  const handleReschedule = (id: number) => {
    toast.info('Reschedule feature coming soon');
  };

  const openCompleteModal = (viewing: Viewing) => {
    setSelectedViewing(viewing);
    setCompletionNotes('');
    setTenantAttended(true);
    setIsCompleteModalOpen(true);
  };

  const openCancelModal = (viewing: Viewing) => {
    setSelectedViewing(viewing);
    setCancellationReason('');
    setIsCancelModalOpen(true);
  };

  const handleCompleteSubmit = () => {
    if (!selectedViewing) return;

    setViewings((prev) =>
      prev.map((v) =>
        v.id === selectedViewing.id
          ? {
              ...v,
              status: 'Completed',
              notes: completionNotes,
              attended: tenantAttended,
            }
          : v,
      ),
    );

    setIsCompleteModalOpen(false);
    toast.success('Viewing marked as completed');
  };

  const handleCancelSubmit = () => {
    if (!selectedViewing) return;

    setViewings((prev) =>
      prev.map((v) =>
        v.id === selectedViewing.id
          ? {
              ...v,
              status: 'Cancelled',
              cancellationReason: cancellationReason,
            }
          : v,
      ),
    );

    setIsCancelModalOpen(false);
    toast.error('Viewing cancelled');
  };

  // Filter for tabs
  const upcomingList = viewings.filter((v) => v.status === 'Scheduled' || v.status === 'Confirmed');
  const completedList = viewings.filter((v) => v.status === 'Completed');

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* BACK TO DASHBOARD BUTTON */}
      <button
        onClick={() => navigate('/agent/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* 1️⃣ PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#0E56A4]">Scheduled Viewings</h1>
        <p className="text-gray-600">Manage and track property viewing appointments</p>
      </div>

      {/* 2️⃣ TOP SECTION — CALENDAR + KPI STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Calendar with appointments */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#0E56A4]" />
              <h2 className="text-lg font-semibold text-[#0E56A4]">Calendar</h2>
            </div>

            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              defaultMonth={new Date(2024, 1)}
              className="rounded-md border-0 w-full"
              modifiers={{
                hasViewing: (date) => {
                  return datesWithViewings.some(
                    (viewingDate) =>
                      viewingDate.getDate() === date.getDate() &&
                      viewingDate.getMonth() === date.getMonth() &&
                      viewingDate.getFullYear() === date.getFullYear(),
                  );
                },
              }}
              modifiersClassNames={{
                hasViewing:
                  '!bg-[#0E56A4] !text-white font-bold hover:!bg-[#0c447f] hover:!text-white',
              }}
            />

            <p className="text-xs text-gray-500 mt-3 text-center">
              Blue dates indicate scheduled viewings
            </p>
          </div>

          {/* Appointments for selected date */}
          {selectedDate && calendarViewings.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-[#0E56A4] mb-3">
                Appointments on{' '}
                {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </h3>
              <div className="space-y-3">
                {calendarViewings.map((viewing) => (
                  <div
                    key={viewing.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#0E56A4] transition cursor-pointer"
                    onClick={() => navigate(`/agent/conversation/${viewing.id}`)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-[#0E56A4]" />
                      <span className="font-medium text-sm">{viewing.time}</span>
                      <StatusBadge status={viewing.status} absolute={false} className="ml-auto" />
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{viewing.tenantName}</p>
                    <p className="text-xs text-gray-500 truncate">{viewing.propertyTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: KPI Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 h-fit">
          {/* KPI 1: Upcoming Viewings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-gray-500">Upcoming Viewings</p>
            </div>
            <h2 className="text-3xl font-bold text-[#0E56A4]">{upcomingCount}</h2>
          </div>

          {/* KPI 2: Completed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <h2 className="text-3xl font-bold text-green-600">{completedCount}</h2>
          </div>

          {/* KPI 3: Cancelled */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-gray-600" />
              <p className="text-sm text-gray-500">Cancelled</p>
            </div>
            <h2 className="text-3xl font-bold text-gray-600">{cancelledCount}</h2>
          </div>
        </div>
      </div>

      {/* 3️⃣ TABS FOR VIEWINGS */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#0E56A4]">Upcoming Appointments</h2>
          </div>

          {upcomingList.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming viewings</h3>
              <p className="text-gray-600">Schedule viewings from the leads page</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingList.map((viewing) => (
                <div
                  key={viewing.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition"
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={viewing.avatar}
                      alt={viewing.tenantName}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-[#0E56A4]">
                          {viewing.tenantName}
                        </h3>
                        <StatusBadge status={viewing.status} absolute={false} />
                      </div>
                      <p className="text-sm text-gray-600 max-w-md truncate">
                        {viewing.propertyTitle}
                      </p>
                      <p className="text-xs text-gray-400">Ref: {viewing.referenceCode}</p>
                      <div className="flex items-center gap-2 mt-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{viewing.dateStr}</span>
                        <span className="text-gray-300">|</span>
                        <Clock className="w-3 h-3" />
                        <span className="text-sm">{viewing.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS ROW */}
                  <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                    <Button
                      size="sm"
                      className="bg-[#0E56A4] hover:bg-[#093B74] text-white"
                      onClick={() => handleConfirm(viewing.id)}
                      disabled={viewing.status === 'Confirmed'}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                      onClick={() => handleReschedule(viewing.id)}
                    >
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => openCancelModal(viewing)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => openCompleteModal(viewing)}
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0E56A4]">Completed Viewings</h2>

          {completedList.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No completed viewings</h3>
              <p className="text-gray-600">Mark viewings as completed to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedList.map((viewing) => (
                <div
                  key={viewing.id}
                  className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col md:flex-row justify-between md:items-center gap-4 opacity-90"
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={viewing.avatar}
                      alt={viewing.tenantName}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0 grayscale"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {viewing.tenantName}
                        </h3>
                        <StatusBadge status="Completed" absolute={false} />
                      </div>
                      <p className="text-sm text-gray-600 max-w-md truncate">
                        {viewing.propertyTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-gray-500">
                        <span className="text-sm">
                          {viewing.dateStr} • {viewing.time}
                        </span>
                      </div>
                      {viewing.notes && (
                        <div className="mt-2 bg-white p-2 rounded border border-gray-200 text-sm text-gray-600 italic">
                          "{viewing.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT SIDE INFO */}
                  <div className="flex flex-col gap-2 md:items-end min-w-[150px]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/agent/conversation/${viewing.id}`)}
                      className="w-full"
                    >
                      View Conversation
                    </Button>
                    {viewing.attended && (
                      <div className="flex items-center gap-1 text-xs text-green-700 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Tenant Attended
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* COMPLETION MODAL */}
      <Dialog open={isCompleteModalOpen} onOpenChange={setIsCompleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mark Viewing as Completed</DialogTitle>
            <DialogDescription>Record the details of the viewing completion.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="attended"
                checked={tenantAttended}
                onCheckedChange={(checked) => setTenantAttended(checked as boolean)}
              />
              <Label htmlFor="attended">Tenant attended the viewing</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="How did the viewing go?"
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCompleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCompleteSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CANCELLATION MODAL */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Viewing</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this viewing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for cancellation</Label>
              <Textarea
                id="reason"
                placeholder="Why is this viewing being cancelled?"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCancelSubmit} variant="destructive">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
