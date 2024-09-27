import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Alert[] = [];

  addAlert(message: string, type: AlertType = 'alert-info'): void {
    const alert: Alert = { message, type };
    this.alerts.push(alert);

    window.setTimeout(()=>{
      this.clearAlerts();
    }, 5000)
  }

  clearAlerts(): void {
    this.alerts = [];
  }
}

export interface Alert {
  message: string;
  type: AlertType;
}

export type AlertType = 'alert-success' | 'alert-info' | 'alert-warning' | 'alert-danger';
