import { IDeviceInfo } from '../../../../core/decorators/device-info.decorator';
import { IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class DeviceInfoDto implements IDeviceInfo {
  @IsOptional()
  @Expose()
  @IsString()
  deviceId: string | null;

  @Expose()
  @IsString()
  deviceName: string;

  @Expose()
  @IsString()
  ip: string;
}
