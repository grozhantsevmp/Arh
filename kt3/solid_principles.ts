class UserManager {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    public updateUserData(newData: Partial<User>): void {
        Object.assign(this.user, newData);
    }
}

class UserValidator {
    public validateUser(user: User): boolean {
        return user.email.includes('@') && user.password.length >= 8;
    }
}

interface Shape {
    calculateArea(): number;
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    }
}

class Circle implements Shape {
    constructor(private radius: number) {}

    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class AreaCalculator {
    calculateTotalArea(shapes: Shape[]): number {
        return shapes.reduce((sum, shape) => sum + shape.calculateArea(), 0);
    }
}

class Bird {
    fly(): void {
        console.log("Летит в небе");
    }
}

class Sparrow extends Bird {
    fly(): void {
        console.log("Воробей летит");
    }
}

class Penguin extends Bird {
    fly(): void {
        throw new Error("Пингвины не летают!");
    }

    swim(): void {
        console.log("Пингвин плавает");
    }
}

interface Workable {
    work(): void;
}

interface Eatable {
    eat(): void;
}

interface Sleepable {
    sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
    work(): void {
        console.log("Человек работает");
    }

    eat(): void {
        console.log("Человек ест");
    }

    sleep(): void {
        console.log("Человек спит");
    }
}

class Robot implements Workable {
    work(): void {
        console.log("Робот работает");
    }
}

interface MessageSender {
    send(message: string): void;
}

class EmailSender implements MessageSender {
    send(message: string): void {
        console.log(`Отправка email: ${message}`);
    }
}

class SMSSender implements MessageSender {
    send(message: string): void {
        console.log(`Отправка SMS: ${message}`);
    }
}

class NotificationService {
    constructor(private messageSender: MessageSender) {}

    notify(message: string): void {
        this.messageSender.send(message);
    }
}

interface User {
    email: string;
    password: string;
}

const user: User = { email: "test@example.com", password: "password123" };
const userManager = new UserManager(user);
const userValidator = new UserValidator();

const shapes: Shape[] = [
    new Rectangle(5, 3),
    new Circle(2)
];
const calculator = new AreaCalculator();

const emailNotification = new NotificationService(new EmailSender());
const smsNotification = new NotificationService(new SMSSender());

console.log("=== Демонстрация принципов SOLID ===\n");

console.log("1. Single Responsibility Principle:");
console.log("Валидация пользователя:", userValidator.validateUser(user));

console.log("\n2. Open/Closed Principle:");
console.log("Общая площадь фигур:", calculator.calculateTotalArea(shapes));

console.log("\n3. Liskov Substitution Principle:");
const sparrow = new Sparrow();
sparrow.fly();
const penguin = new Penguin();
penguin.swim();

console.log("\n4. Interface Segregation Principle:");
const human = new Human();
const robot = new Robot();
human.work();
human.eat();
human.sleep();
robot.work();

console.log("\n5. Dependency Inversion Principle:");
emailNotification.notify("Привет через email!");
smsNotification.notify("Привет через SMS!"); 