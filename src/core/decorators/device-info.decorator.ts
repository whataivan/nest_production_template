import { v4 as uuid } from 'uuid';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IDeviceInfo {
  deviceId: string | null;
  deviceName: string;
  ip: string;
}

export const DeviceMeta = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IDeviceInfo => {
    const request = ctx.switchToHttp().getRequest();
    return {
      deviceId: request.user.deviceId ?? uuid(),
      deviceName: request.headers['user-agent'],
      ip: request.ip,
    };
  },
);
