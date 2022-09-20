import { ICar } from 'Interface';
import { create, generateId, all, update, deleteOne, find } from 'Utils';

export class Car {
  private _title: string;
  private _brand: string;
  private _age: number;
  private _price: string;

  constructor(car: ICar) {
    this._title = car.title;
    this._brand = car.brand;
    this._price = car.price;
    this._age = car.age;
  }

  get title(): string {
    return this._title;
  }
  get brand(): string {
    return this._brand;
  }
  get price(): string {
    return this._price;
  }
  get age(): number {
    return this._age;
  }

  set title(title: string) {
    this._title = title;
  }
  set brand(brand: string) {
    this._brand = brand;
  }
  set price(price: string) {
    this._price = price;
  }
  set age(supplier: number) {
    this._age = supplier;
  }

  static async create(car: ICar) {
    let _id = generateId();
    const new_car = {
      title: car.title,
      brand: car.brand,
      price: car.price,
      age: car.age,
    } as ICar;
    return await create<ICar>(new_car);
  }

  static async update(id: string, car: ICar) {
    await update<ICar>(id, car);
  }

  static async all() {
    return await all<ICar>();
  }

  static async finAll(id: string) {
    return await find<ICar[]>(id);
  }

  static async delete(id: string) {
    await deleteOne(id);
  }
}
