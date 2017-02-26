import { User } from '../../shared';
export class Blood_pressure {
    constructor(
        public id?: number,
        public timestamp?: any,
        public systolic?: string,
        public diastolic?: number,
        public user?: User,
    ) { }
}
