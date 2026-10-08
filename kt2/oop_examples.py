from abc import ABC, abstractmethod

class Transport(ABC):
    def __init__(self, model: str, year: int):
        self.model = model
        self.year = year
    
    @abstractmethod
    def move(self):
        pass

class Car(Transport):
    def __init__(self, model: str, year: int, fuel_type: str):
        super().__init__(model, year)
        self.__fuel_type = fuel_type  
    
    def move(self):
        return f"Автомобиль {self.model} едет по дороге"
    
    def get_fuel_type(self):
        return self.__fuel_type

class Airplane(Transport):
    def __init__(self, model: str, year: int, max_altitude: float):
        super().__init__(model, year)
        self.__max_altitude = max_altitude 
    
    def move(self):
        return f"Самолет {self.model} летит в воздухе"
    
    def get_max_altitude(self):
        return self.__max_altitude

def main():
    car = Car("Toyota Camry", 2022, "Бензин")
    airplane = Airplane("Boeing 747", 2020, 13000)
    
    vehicles = [car, airplane]
    for vehicle in vehicles:
        print(vehicle.move())
    
    print(f"Тип топлива автомобиля: {car.get_fuel_type()}")
    print(f"Максимальная высота самолета: {airplane.get_max_altitude()} метров")

if __name__ == "__main__":
    main() 