import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) { }
  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    return await this.prisma.organization.create({data: {
      ...createOrganizationDto}});
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
