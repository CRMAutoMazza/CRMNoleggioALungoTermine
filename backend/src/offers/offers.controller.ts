
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) { }

    @Get()
    async getOffers() {
        return this.offersService.getOffers();
    }

    @Post()
    async saveOffers(@Body() body: { headers: string[], data: any[] }) {
        return this.offersService.saveOffers(body.headers, body.data);
    }
}
