import { Subject } from "rxjs";

/**
 * Complete a Subject
 */
export function unsubscribe<T = any>(subscription: Subject<T | any>) {
    subscription.next(null);
    subscription.complete();
}