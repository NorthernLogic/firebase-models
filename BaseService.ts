import * as firebase from "firebase";
import * as rx from "rxjs";
import "rxjs/add/operator/combineAll";

export interface BaseModel {
    id: string;
}

export const serviceRegistry: Map<Function, NlFirebaseService<any>> = new Map();

export class NlFirebaseService<M extends BaseModel> {
  protected path: string;
  protected db: firebase.database.Database;

  constructor(app: firebase.app.App, registry: Map<Function, NlFirebaseService<any>>, private model: { new(...args: any[]): M }) {
    this.db = app.database();
    serviceRegistry.set(this.constructor, this);

    if (!this.path) {
      throw new Error("Path must be definied");
    }
  }

  private getPath(id?: string) {
    if (id) {
      return this.db.ref(`${this.path}/${id}`);
    } else {
      return this.db.ref(`${this.path}`);
    }
  }

  protected get serviceMap() {
    return {};
  };

  private expand(instance: any, childKeys: string[]): rx.Observable<M> {
    return rx.Observable.merge(...childKeys.map(childKey => {
      const serviceClass = this.serviceMap[childKey];
      const service = serviceRegistry.get(serviceClass);

      if (!serviceClass) {
        throw new Error(`${childKey} is not registered on the model`);
      }

      if (!service) {
        throw new Error(`The service for ${childKey} has not been registered`);
      }

      return <rx.Observable<M>> service.get(instance[childKey + "Id"])
        .map(child => instance[childKey] = child)
        .map(() => instance);
    }))
    .skip(childKeys.length - 1);
  }

  private handleValue(snapshot: firebase.database.DataSnapshot, expandProperties: string[]): rx.Observable<M> {
    const value = snapshot.val();

    if (!value) {
      return <rx.Observable<M>> rx.Observable.empty();
    }

    const instance = new this.model();
    Object.assign(instance, value);

    instance.id = snapshot.key;

    if (expandProperties) {
      return this.expand(instance, expandProperties);
    } else {
      return rx.Observable.of(instance);
    }
  }

  public handleListValue(snapshot: firebase.database.DataSnapshot, expandProperties: string[]): rx.Observable<M[]> {
    if (expandProperties) {
      const children: rx.Observable<M>[] = [];
      snapshot.forEach(child => {
        children.push(this.handleValue(child, expandProperties));
        return false;
      });
      return rx.Observable.combineLatest(...children);
    } else {
      return rx.Observable.combineLatest(this.handleValue(snapshot, expandProperties));
    }
  }

  get(id: string, expandProperties?: string[]): rx.Observable<M> {
    return rx.Observable.create(subscriber => {
      this.getPath(id).on("value", snapshot => {
        this.handleValue(snapshot, expandProperties)
        .subscribe(value => subscriber.next(value));
      });
    });
  }

  list(expandProperties?: string[]): rx.Observable<M[]> {
    return rx.Observable.create(subscriber => {
      this.getPath().on("value", snapshot => {
        this.handleListValue(snapshot, expandProperties)
        .subscribe(value => subscriber.next(value));
      });
    });
  }

  save(model: M) {
    if (model.id) {
      this.getPath(model.id).set(model);
    } else {
      this.getPath().push(model);
    }
  }
}

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCR94w9X2HSyeHV5o7nJZRFH4hnMOL7MLc",
  authDomain: "fithop-74cc5.firebaseapp.com",
  databaseURL: "https://fithop-74cc5.firebaseio.com",
  storageBucket: "",
};
const app = firebase.initializeApp(config);

export function registerService (service) {
  return new service(app, serviceRegistry);
}
