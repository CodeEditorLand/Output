import{createDecorator as t}from"../../instantiation/common/instantiation.js";import"./gdprTypings.js";const m=t("telemetryService"),l=t("customEndpointTelemetryService"),p="telemetry.currentSessionDate",y="telemetry.firstSessionDate",E="telemetry.lastSessionDate",I="telemetry.machineId",v="telemetry.sqmId",S="telemetry.devDeviceId",T="telemetry",g="telemetry.telemetryLevel",x="telemetry.enableCrashReporter",D="telemetry.enableTelemetry";var r=(e=>(e[e.NONE=0]="NONE",e[e.CRASH=1]="CRASH",e[e.ERROR=2]="ERROR",e[e.USAGE=3]="USAGE",e))(r||{}),n=(e=>(e.OFF="off",e.CRASH="crash",e.ERROR="error",e.ON="all",e))(n||{});export{l as ICustomEndpointTelemetryService,m as ITelemetryService,x as TELEMETRY_CRASH_REPORTER_SETTING_ID,D as TELEMETRY_OLD_SETTING_ID,T as TELEMETRY_SECTION_ID,g as TELEMETRY_SETTING_ID,n as TelemetryConfiguration,r as TelemetryLevel,p as currentSessionDateStorageKey,S as devDeviceIdKey,y as firstSessionDateStorageKey,E as lastSessionDateStorageKey,I as machineIdKey,v as sqmIdKey};
