import { Module } from '@nestjs/common';
import { StudentModule } from 'src/students/students.module';
import { UserModule } from 'src/users/users.module';
import { AdministrationService } from './administration.service';
import { AdministrationController } from './adminstration.controller';

@Module({
  imports: [UserModule, StudentModule],
  controllers: [AdministrationController],
  providers: [AdministrationService],
})
export class AdministrationModule {}
