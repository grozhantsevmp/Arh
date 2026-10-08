"use strict";
class UserManager {
    constructor(user) {
        this.user = user;
    }
    updateUserData(newData) {
        Object.assign(this.user, newData);
    }
}
class UserValidator {
    validateUser(user) {
        return user.email.includes('@') && user.password.length >= 8;
    }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
}
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}
class AreaCalculator {
    calculateTotalArea(shapes) {
        return shapes.reduce((sum, shape) => sum + shape.calculateArea(), 0);
    }
}
class Bird {
    fly() {
        console.log("Летит в небе");
    }
}
class Sparrow extends Bird {
    fly() {
        console.log("Воробей летит");
    }
}
class Penguin extends Bird {
    fly() {
        throw new Error("Пингвины не летают!");
    }
    swim() {
        console.log("Пингвин плавает");
    }
}
class Human {
    work() {
        console.log("Человек работает");
    }
    eat() {
        console.log("Человек ест");
    }
    sleep() {
        console.log("Человек спит");
    }
}
class Robot {
    work() {
        console.log("Робот работает");
    }
}
class EmailSender {
    send(message) {
        console.log(`Отправка email: ${message}`);
    }
}
class SMSSender {
    send(message) {
        console.log(`Отправка SMS: ${message}`);
    }
}
class NotificationService {
    constructor(messageSender) {
        this.messageSender = messageSender;
    }
    notify(message) {
        this.messageSender.send(message);
    }
}
const user = { email: "test@example.com", password: "password123" };
const userManager = new UserManager(user);
const userValidator = new UserValidator();
const shapes = [
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
