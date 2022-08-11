import { http } from '@core/http';
import { State } from '@core/state';
import { Developer } from '@type/developer.type';

export interface DeveloperState extends Developer {
  id?: string;
}

const DEFAULT_STATE: DeveloperState = {
  access_token: '',
};
export class DeveloperModel extends State<DeveloperState> {
  name = 'developer';
  constructor() {
    super(DEFAULT_STATE);
  }

  auth(): Promise<boolean> {
    console.log('这是开发者认证步骤');
    http.headers = { Authorization: 'Bearer test_access_token' };
    return Promise.resolve(true);
  }

  destroy() {
    this.setState(DEFAULT_STATE);
  }
}

export const developerModel = new DeveloperModel();
