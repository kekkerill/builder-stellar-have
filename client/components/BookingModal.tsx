import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Monitor,
  Building,
  Clock,
  User,
  CheckCircle2,
  MapPin,
  Calendar,
  Coffee,
  Wifi,
  Printer,
  Gamepad2,
  Camera,
  Headphones,
  Keyboard,
  Mouse,
  Lamp,
  UsbIcon,
  WebcamIcon,
  Computer,
} from "lucide-react";
import { toast } from "sonner";

interface BookingModalProps {
  workspace: {
    id: string;
    name: string;
    floor: number;
    capacity: number;
    isAvailable: boolean;
    equipment: string[];
    floorEquipment: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const equipmentIcons: Record<string, any> = {
  "Монитор": Monitor,
  "Клавиатура": Keyboard,
  "Мышь": Mouse,
  "Настольная лампа": Lamp,
  "USB-хаб": UsbIcon,
  "Веб-камера": WebcamIcon,
  "Наушники": Headphones,
  "Принтер": Printer,
  "Кофе-машина": Coffee,
  "Wi-Fi": Wifi,
  "Кондиционер": Computer,
  "Проектор": Monitor,
  "default": Monitor
};

const getEquipmentIcon = (equipment: string) => {
  for (const [key, Icon] of Object.entries(equipmentIcons)) {
    if (equipment.toLowerCase().includes(key.toLowerCase())) {
      return Icon;
    }
  }
  return equipmentIcons.default;
};

export function BookingModal({ workspace, isOpen, onClose }: BookingModalProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    if (!selectedDuration) {
      toast.error("Пожалуйста, выберите продолжительность бронирования");
      return;
    }

    setIsBooking(true);
    
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`Место "${workspace.name}" успешно забронировано на ${getDurationText(selectedDuration)}!`);
    setIsBooking(false);
    onClose();
  };

  const getDurationText = (duration: string) => {
    switch (duration) {
      case "1hour": return "1 час";
      case "2hours": return "2 часа";
      case "endOfDay": return "до конца дня";
      default: return duration;
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("ru-RU", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const getEndTime = (duration: string) => {
    const now = new Date();
    switch (duration) {
      case "1hour":
        now.setHours(now.getHours() + 1);
        break;
      case "2hours":
        now.setHours(now.getHours() + 2);
        break;
      case "endOfDay":
        now.setHours(18, 0, 0, 0); // End of day at 18:00
        break;
    }
    return now.toLocaleTimeString("ru-RU", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-primary" />
            {workspace.name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              {workspace.floor} этаж
            </span>
            <Badge 
              variant={workspace.isAvailable ? "default" : "secondary"}
              className={workspace.isAvailable ? "bg-green-100 text-green-800" : ""}
            >
              {workspace.isAvailable ? "Доступно" : "Занято"}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="equipment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="equipment">Оборудование за столом</TabsTrigger>
            <TabsTrigger value="floor">Оборудование на этаже</TabsTrigger>
            <TabsTrigger value="booking">Бронирование</TabsTrigger>
          </TabsList>

          <TabsContent value="equipment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Оборудование за рабочим столом
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workspace.equipment.map((item, index) => {
                    const Icon = getEquipmentIcon(item);
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-md">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="floor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Оборудование на {workspace.floor} этаже
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workspace.floorEquipment.map((item, index) => {
                    const Icon = getEquipmentIcon(item);
                    return (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-accent/50 rounded-md">
                          <Icon className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            {workspace.isAvailable ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Выберите продолжительность
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedDuration} onValueChange={setSelectedDuration}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="1hour" id="1hour" />
                          <Label htmlFor="1hour" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">1 час</span>
                              <span className="text-sm text-muted-foreground">
                                {getCurrentTime()} - {getEndTime("1hour")}
                              </span>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="2hours" id="2hours" />
                          <Label htmlFor="2hours" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">2 часа</span>
                              <span className="text-sm text-muted-foreground">
                                {getCurrentTime()} - {getEndTime("2hours")}
                              </span>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value="endOfDay" id="endOfDay" />
                          <Label htmlFor="endOfDay" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">До конца дня</span>
                              <span className="text-sm text-muted-foreground">
                                {getCurrentTime()} - 18:00
                              </span>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Дополнительная информация</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Комментарии (необязательно)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Укажите особые требования или комментарии..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {selectedDuration && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span className="font-medium">Подтверждение бронирования</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Рабочее место:</span>
                          <span className="font-medium">{workspace.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Этаж:</span>
                          <span className="font-medium">{workspace.floor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Время:</span>
                          <span className="font-medium">
                            {getCurrentTime()} - {getEndTime(selectedDuration)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Продолжительность:</span>
                          <span className="font-medium">{getDurationText(selectedDuration)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Отмена
                  </Button>
                  <Button 
                    onClick={handleBooking} 
                    disabled={!selectedDuration || isBooking}
                    className="flex-1"
                  >
                    {isBooking ? "Бронирование..." : "Забронировать место"}
                  </Button>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-full w-fit mx-auto">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Место сейчас занято</h3>
                      <p className="text-sm text-muted-foreground">
                        Это рабочее место в данный момент недоступно для бронирования
                      </p>
                    </div>
                    <Button variant="outline" onClick={onClose}>
                      Закрыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
