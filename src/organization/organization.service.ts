import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'nestjs-prisma';
import { Organization } from '@prisma/client';

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

  async findOne(id: number): Promise<Organization> {
    const organization = await this.prisma.organization.findFirst({ where: { id } })
    if (!organization){
      throw new HttpException('organization not found', HttpStatus.NOT_FOUND)
    }
    return organization
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
