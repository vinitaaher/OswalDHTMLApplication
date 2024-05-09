 // web-vitals-autoinstrumentation.js

 import { onFID, onLCP, onCLS} from 'web-vitals/attribution';
 import { InstrumentationBase } from '@opentelemetry/instrumentation';
 import { trace, context } from '@opentelemetry/api';
 import { hrTime } from '@opentelemetry/core';
 import{sessionId}from'./session.js'

 export class WebVitalsInstrumentation extends InstrumentationBase {
   // function that creates a span for each web vital and reports the data
    // as attributes
//    let uniqueId;
     constructor(uniqueId) {
        super();
        this.uniqueId = uniqueId;
        console.log("unique id "+this.uniqueId);

      }
    onReport(metric, parentSpanContext) {
      const now = hrTime();


      // start the span
      const webVitalsSpan = trace
        .getTracer('web-vitals-instrumentation')
        .startSpan(metric.name, { startTime: now }, parentSpanContext);

       console.log("unique id in on report "+this.uniqueId);
       console.log("pageUrl :"+ window.location.href);
      // add core web vital attributes
      webVitalsSpan.setAttributes({
        ['web_vital.name']: metric.name,
        ['web_vital.id']: metric.id,
        ['web_vital.navigationType']: metric.navigationType,
        ['web_vital.delta']: metric.delta,
        ['web_vital.rating']: metric.rating,
        ['web_vital.value']: metric.value,
        // can expand these into their own attributes!
        ['web_vital.entries']: JSON.stringify(metric.entries),
         ['sessionId']: sessionId,
          ['pageId']:  this.uniqueId ,
           ['pageUrl']: window.location.href,
          ['attribution']:metric.attribution
      });


   switch (metric.name) {
         case 'LCP':
           webVitalsSpan.setAttributes({
             'web_vital.lcp.element': metric.attribution.element,
             'web_vital.lcp.url': metric.attribution.url,
             'web_vital.lcp.timeToFirstByte': metric.attribution.timeToFirstByte,
             'web_vital.lcp.resourceLoadDelay': metric.attribution.resourceLoadDelay,
             'web_vital.lcp.resourceLoadTime': metric.attribution.resourceLoadTime,
             'web_vital.lcp.elementRenderDelay': metric.attribution.elementRenderDelay,
             'web_vital.lcp.lcpResourceEntry': metric.attribution.lcpResourceEntry,
             'web_vital.lcp.navigationEntry': metric.attribution.navigationEntry,
             'web_vital.lcp.lcpEntry': metric.attribution.lcpEntry

           });
           break;

         case 'CLS':
           webVitalsSpan.setAttributes({
             'web_vital.cls.largestShiftTarget':metric.attribution.largestShiftTarget,
             'web_vital.cls.largestShiftEntry':metric.attribution.largestShiftEntry,
             'web_vital.cls.largestShiftSource':metric.attribution.largestShiftSource,
             'web_vital.cls.largestShiftValue':metric.attribution.largestShiftValue,
             'web_vital.cls.largestShiftEntry':metric.attribution.largestShiftEntry,
             'web_vital.cls.loadState':metric.attribution.loadState

           });
           break;
         case 'FID':
           webVitalsSpan.setAttributes({
             'web_vital.fid.element': metric.attribution.eventTarget,
             'web_vital.fid.eventType':metric.attribution.eventType,
              'web_vital.fid.eventEntry':metric.attribution.eventEntry,
               'web_vital.fid.eventTime':metric.attribution.eventTime
           });
           break;
         default:
           break;
       }

      // end the span
      webVitalsSpan.end();
    }


    enable() {
    if (this.enabled) {
      return;
    }
    this.enabled = true;
    // create a parent span that will have all web vitals spans as children
    const parentSpan = trace.getTracer('web-vitals-instrumentation').startSpan('web-vitals');
    const ctx = trace.setSpan(context.active(), parentSpan);
    parentSpan.end();


    // Capture First Input Delay
    onFID((metric) => {
      this.onReport(metric, ctx);
    });


    // Capture Cumulative Layout Shift
    onCLS((metric) => {
      this.onReport(metric, ctx);
    });


    // Capture Largest Contentful Paint
    onLCP((metric) => {
      this.onReport(metric, ctx);
    });
    }
  }