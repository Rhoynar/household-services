import { MongoObservable } from 'meteor-rxjs';
// export const Parties = new MongoObservable.Collection('parties');
import { Party } from '../models/party.model';


export const Parties = new MongoObservable.Collection<Party>('parties');