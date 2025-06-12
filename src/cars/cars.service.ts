import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid} from 'uuid'
import { Car } from './interfaces/car.inteface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars : Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ]

    findAll(){
        return this.cars;
    }

    findOneById( id: string ){
        
        const carFound = this.cars.find(car => car.id === id);
        
        if( !carFound ) throw new NotFoundException(`Car with id ${id} not found`);
        
        return carFound;

    }

    create( createCarDto: CreateCarDto) {

        const newCar : Car = {
            id : uuid(),
            ...createCarDto
        } 

        this.cars.push(newCar)

        return newCar
    }

    update( id: string, updateCarDto: UpdateCarDto){

        let carDB = this.findOneById( id );

        if( updateCarDto.id && updateCarDto.id !== id )
            throw new BadRequestException("Car id is not valid inside body")

        this.cars = this.cars.map( car => {
            if( car.id === id ){

                console.log(carDB)
                console.log(updateCarDto)
                carDB = {...carDB, ...updateCarDto, id}
                return carDB;
            }
            return car
        })
        return carDB
    }

    delete( id: string ){

        const carFound = this.findOneById( id );
        
        const newCars = this.cars.filter(car => 
            carFound.id !== car.id
        )

        return this.cars = newCars
    }

    fillCarsWithSeedData( cars: Car[] ){
        this.cars = cars
    }

    
}
