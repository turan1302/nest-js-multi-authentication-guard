import { AdminJwtGuardGuard } from './admin-jwt-guard.guard';

describe('AdminJwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new AdminJwtGuardGuard()).toBeDefined();
  });
});
