//import {
//        CLSAttribution, CLSMetricWithAttribution,FIDAttribution,FIDMetricWithAttribution,
//        LCPAttribution,LCPMetricWithAttribution, Metric,onCLS,onFID,onLCP} from 'web-vitals/attribution';
//import { InstrumentationBase,InstrumentationConfig} from '@opentelemetry/instrumentation';
// export class WebVitalsInstrumentation extends InstrumentationBase {
//
//   getAttrPrefix(name) {
//        return name.toLowerCase();
//   }
//
//   getSharedAttributes(vital) {
//     const { name, id, delta, rating, value, navigationType } = vital;
//     const attrPrefix = this.getAttrPrefix(name);
//     return {
//               ['${attrPrefix}.id']: id,
//               ['${attrPrefix}.delta']: delta,
//               ['${attrPrefix}.value']: value,
//               ['${attrPrefix}.rating']: rating,
//               ['${attrPrefix}.navigation_type']: navigationType,
//           };
//       }
//
//   onReportCLS(cls) {
//       const { name, attribution } = cls;
//       const { largestShiftTarget,largestShiftTime,largestShiftValue,loadState,largestShiftEntry,} = attribution;
//       const attrPrefix = this.getAttrPrefix(name);
//       const span = this.tracer.startSpan(name);
//       span.setAttributes({
//        this.getSharedAttributes(cls),
//        ['${attrPrefix}.largest_shift_target']: largestShiftTarget,
//        ['${attrPrefix}.element']: largestShiftTarget,
//        ['${attrPrefix}.largest_shift_time']: largestShiftTime,
//        ['${attrPrefix}.largest_shift_value']: largestShiftValue,
//        ['${attrPrefix}.load_state']: loadState,
//        ['${attrPrefix}.had_recent_input']: largestShiftEntry?.hadRecentInput,
//         });
//        span.end();
//     }
//
//     onReportCLS(lcp) {
//          const { name, attribution } = lcp;
//          const { element,url,timeToFirstByte,resourceLoadDelay,resourceLoadTime,elementRenderDelay} = attribution;
//          const attrPrefix = this.getAttrPrefix(name);
//          const span = this.tracer.startSpan(name);
//          span.setAttributes({
//           this.getSharedAttributes(lcp),
//            ['${attrPrefix}.element']: element,
//            ['${attrPrefix}.url']: url,
//            ['${attrPrefix}.time_to_first_byte']: timeToFirstByte,
//            ['${attrPrefix}.resource_load_delay']: resourceLoadDelay,
//            ['${attrPrefix}.resource_load_time']: resourceLoadTime,
//            ['${attrPrefix}.element_render_delay']: elementRenderDelay,
//            });
//           span.end();
//        }
//
//     onReportFID(fid) {
//             const { name, attribution } = fid;
//             const { eventTarget, eventType, loadState } = attribution;
//             const attrPrefix = this.getAttrPrefix(name);
//             const span = this.tracer.startSpan(name);
//
//             span.setAttributes({
//                 this.getSharedAttributes(fid),
//                 ['${attrPrefix}.element']: eventTarget,
//                 ['${attrPrefix}.event_type']: eventType,
//                 ['${attrPrefix}.load_state']: loadState,
//             });
//             span.end();
//         }
//
//     onCLS((vital) => {
//         this.onReportCLS(vital);
//     });
//     onLCP((vital) => {
//         this.onReportLCP(vital);
//     });
//     onFID((vital) => {
//         this.onReportFID(vital);
//     });
//
//  }
