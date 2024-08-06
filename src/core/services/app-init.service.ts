import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppInitService implements OnApplicationBootstrap {
  constructor() {}

  async onApplicationBootstrap() {}
}
