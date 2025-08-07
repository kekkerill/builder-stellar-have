import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Monitor, 
  Wifi, 
  Coffee, 
  Users, 
  Clock,
  ChevronRight,
  Building
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

interface Workspace {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  isAvailable: boolean;
  equipment: string[];
  floorEquipment: string[];
  nextAvailable?: string;
}

const workspaces: Workspace[] = [
  {
    id: "1",
    name: "Рабочее место A1",
    floor: 1,
    capacity: 1,
    isAvailable: true,
    equipment: ["Монитор 27\"", "Клавиатура", "Мышь", "Настольная лампа", "USB-хаб"],
    floorEquipment: ["Принтер", "Кофе-машин��", "Переговорная комната", "Wi-Fi 6", "Кондиционер"]
  },
  {
    id: "2",
    name: "Рабочее место A2",
    floor: 1,
    capacity: 1,
    isAvailable: false,
    equipment: ["Монитор 32\"", "Механическая клавиатура", "Мышь", "Настольная лампа", "Веб-камера"],
    floorEquipment: ["Принтер", "Кофе-машина", "Переговорная комната", "Wi-Fi 6", "Кондиционер"],
    nextAvailable: "14:30"
  },
  {
    id: "3",
    name: "Рабочее место B1",
    floor: 2,
    capacity: 1,
    isAvailable: true,
    equipment: ["Монитор 24\"", "Клавиатура", "Мышь", "Настольная лампа", "Документ-камера"],
    floorEquipment: ["Цветной принтер", "Кухня", "Зона отдыха", "Wi-Fi 6", "Кондиционер", "Проектор"]
  },
  {
    id: "4",
    name: "Рабочее место B2",
    floor: 2,
    capacity: 1,
    isAvailable: true,
    equipment: ["Монитор 27\"", "Беспроводная клавиатура", "Беспроводная мышь", "Настольная лампа", "Подставка для ноутбука"],
    floorEquipment: ["Цветной принтер", "Кухня", "Зона отдыха", "Wi-Fi 6", "Кондиционер", "Проектор"]
  },
  {
    id: "5",
    name: "Рабочее место C1",
    floor: 3,
    capacity: 1,
    isAvailable: false,
    equipment: ["Изогнутый монитор 34\"", "Игровая клавиатура", "Игровая мышь", "RGB подсветка", "Наушники"],
    floorEquipment: ["Многофункциональный принтер", "Бар", "Игровая зона", "Wi-Fi 6E", "Умный кондиционер"],
    nextAvailable: "16:00"
  },
  {
    id: "6",
    name: "Рабочее место C2",
    floor: 3,
    capacity: 1,
    isAvailable: true,
    equipment: ["Монитор 28\"", "Клавиатура", "Трекбол", "Настольная лампа", "Подставка под монитор"],
    floorEquipment: ["Многофункциональный принтер", "Бар", "Игровая зона", "Wi-Fi 6E", "Умный кондиционер"]
  }
];

export default function Index() {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedWorkspace(null);
  };

  const availableCount = workspaces.filter(w => w.isAvailable).length;
  const totalCount = workspaces.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">OfficeSpace</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Users className="h-3 w-3 mr-1" />
              {availableCount}/{totalCount} доступно
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Бронирование рабочих мест
          </h2>
          <p className="text-muted-foreground text-lg">
            Выберите подходящее рабочее место и забронируйте его на нужное время
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{availableCount}</p>
                  <p className="text-sm text-muted-foreground">Доступно сейчас</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/50 rounded-lg">
                  <Building className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Этажа</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <Clock className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-muted-foreground">Доступ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Card key={workspace.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{workspace.name}</CardTitle>
                  <Badge 
                    variant={workspace.isAvailable ? "default" : "secondary"}
                    className={workspace.isAvailable ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {workspace.isAvailable ? "Доступно" : "Занято"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {workspace.floor} этаж
                </div>
                {!workspace.isAvailable && workspace.nextAvailable && (
                  <p className="text-sm text-muted-foreground">
                    Доступно с {workspace.nextAvailable}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Equipment Preview */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Monitor className="h-4 w-4" />
                    Оборудование
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {workspace.equipment.slice(0, 3).map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {workspace.equipment.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{workspace.equipment.length - 3} еще
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Floor Equipment Preview */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    На этаже
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {workspace.floorEquipment.slice(0, 2).map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    <Badge variant="secondary" className="text-xs">
                      +{workspace.floorEquipment.length - 2} еще
                    </Badge>
                  </div>
                </div>

                <Button 
                  onClick={() => handleBookWorkspace(workspace)}
                  className="w-full"
                  disabled={!workspace.isAvailable}
                >
                  {workspace.isAvailable ? "Посмотреть и забронировать" : "Посмотреть детали"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Booking Modal */}
      {selectedWorkspace && (
        <BookingModal
          workspace={selectedWorkspace}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
