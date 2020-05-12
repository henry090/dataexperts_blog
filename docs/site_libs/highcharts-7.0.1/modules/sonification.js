/*
 Highcharts JS v7.0.1 (2018-12-19)
 Sonification module

 (c) 2012-2018 ystein Moseng

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?module.exports=l:"function"===typeof define&&define.amd?define(function(){return l}):l("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(l){var t=function(c){function f(c){this.init(c)}var g={type:"oscillator",playCallbackInterval:20,oscillator:{waveformShape:"sine"}};f.prototype.init=function(b){this.initAudioContext()?(this.options=c.merge(g,b),this.id=this.options.id=b&&b.id||c.uniqueKey(),b=c.audioContext,this.gainNode=b.createGain(),
this.setGain(0),(this.panNode=b.createStereoPanner&&b.createStereoPanner())?(this.setPan(0),this.gainNode.connect(this.panNode),this.panNode.connect(b.destination)):this.gainNode.connect(b.destination),"oscillator"===this.options.type&&this.initOscillator(this.options.oscillator),this.playCallbackTimers=[]):c.error(29)};f.prototype.copy=function(b){return new f(c.merge(this.options,{id:null},b))};f.prototype.initAudioContext=function(){var b=c.win.AudioContext||c.win.webkitAudioContext,d=!!c.audioContext;
return b?(c.audioContext=c.audioContext||new b,!d&&c.audioContext&&"running"===c.audioContext.state&&c.audioContext.suspend(),!!(c.audioContext&&c.audioContext.createOscillator&&c.audioContext.createGain)):!1};f.prototype.initOscillator=function(b){this.oscillator=c.audioContext.createOscillator();this.oscillator.type=b.waveformShape;this.oscillator.connect(this.gainNode);this.oscillatorStarted=!1};f.prototype.setPan=function(b){this.panNode&&this.panNode.pan.setValueAtTime(b,c.audioContext.currentTime)};
f.prototype.setGain=function(b,d){this.gainNode&&(1.2<b&&(console.warn("Highcharts sonification warning: Volume of instrument set too high."),b=1.2),d?(this.gainNode.gain.setValueAtTime(this.gainNode.gain.value,c.audioContext.currentTime),this.gainNode.gain.linearRampToValueAtTime(b,c.audioContext.currentTime+d/1E3)):this.gainNode.gain.setValueAtTime(b,c.audioContext.currentTime))};f.prototype.cancelGainRamp=function(){this.gainNode&&this.gainNode.gain.cancelScheduledValues(0)};f.prototype.getValidFrequency=
function(b,d,a){var e=this.options.allowedFrequencies,g=c.pick(a,Infinity),f=c.pick(d,-Infinity);return e&&e.length?e.reduce(function(a,d){return Math.abs(d-b)<Math.abs(a-b)&&d<g&&d>f?d:a},Infinity):b};f.prototype.clearPlayCallbackTimers=function(){this.playCallbackTimers.forEach(function(c){clearInterval(c)});this.playCallbackTimers=[]};f.prototype.setFrequency=function(c,d){d=d||{};c=this.getValidFrequency(c,d.min,d.max);"oscillator"===this.options.type&&this.oscillatorPlay(c)};f.prototype.oscillatorPlay=
function(b){this.oscillatorStarted||(this.oscillator.start(),this.oscillatorStarted=!0);this.oscillator.frequency.setValueAtTime(b,c.audioContext.currentTime)};f.prototype.preparePlay=function(){this.setGain(.001);"suspended"===c.audioContext.state&&c.audioContext.resume();this.oscillator&&!this.oscillatorStarted&&(this.oscillator.start(),this.oscillatorStarted=!0)};f.prototype.play=function(b){var d=this,a=b.duration||0,e=function(a,c,e){var g=b.duration,f=0,q=d.options.playCallbackInterval;if("function"===
typeof a){var n=setInterval(function(){f++;var b=f*q/g;if(1<=b)d[c](a(1),e),clearInterval(n);else d[c](a(b),e)},q);d.playCallbackTimers.push(n)}else d[c](a,e)};if(d.id)if("suspended"===c.audioContext.state||this.oscillator&&!this.oscillatorStarted)d.preparePlay(),setTimeout(function(){d.play(b)},10);else{d.playCallbackTimers.length&&d.clearPlayCallbackTimers();d.cancelGainRamp();d.stopOscillatorTimeout&&(clearTimeout(d.stopOscillatorTimeout),delete d.stopOscillatorTimeout);d.stopTimeout&&(clearTimeout(d.stopTimeout),
delete d.stopTimeout,d.stopCallback&&(d._play=d.play,d.play=function(){},d.stopCallback("cancelled"),d.play=d._play));var g=a<c.sonification.fadeOutDuration+20;d.stopCallback=b.onEnd;var f=function(){delete d.stopTimeout;d.stop(g)};a?(d.stopTimeout=setTimeout(f,g?a:a-c.sonification.fadeOutDuration),e(b.frequency,"setFrequency",null,{minFrequency:b.minFrequency,maxFrequency:b.maxFrequency}),e(c.pick(b.volume,1),"setGain",4),e(c.pick(b.pan,0),"setPan")):f()}};f.prototype.mute=function(){this.setGain(.0001,
.8*c.sonification.fadeOutDuration)};f.prototype.stop=function(b,d,a){var e=this,g=function(){e.stopOscillatorTimeout&&delete e.stopOscillatorTimeout;try{e.oscillator.stop()}catch(p){}e.oscillator.disconnect(e.gainNode);e.initOscillator(e.options.oscillator);d&&d(a);e.stopCallback&&e.stopCallback(a)};e.playCallbackTimers.length&&e.clearPlayCallbackTimers();e.stopTimeout&&clearTimeout(e.stopTimeout);b?(e.setGain(0),g()):(e.mute(),e.stopOscillatorTimeout=setTimeout(g,c.sonification.fadeOutDuration+100))};
return f}(l),r=function(c){function f(c){this.init(c||[])}f.prototype.init=function(c){this.supportedSignals=c;this.signals={}};f.prototype.registerSignalCallbacks=function(c){var b=this;b.supportedSignals.forEach(function(d){c[d]&&(b.signals[d]=b.signals[d]||[]).push(c[d])})};f.prototype.clearSignalCallbacks=function(c){var b=this;c?c.forEach(function(c){b.signals[c]&&delete b.signals[c]}):b.signals={}};f.prototype.emitSignal=function(c,b){var d;this.signals[c]&&this.signals[c].forEach(function(c){c=
c(b);d=void 0!==c?c:d});return d};return{musicalFrequencies:c,SignalHandler:f,getMusicalScale:function(f){return c.filter(function(c,d){var a=d%12+1;return f.some(function(c){return c===a})})},calculateDataExtremes:function(c,b){return c.series.reduce(function(c,a){a.points.forEach(function(a){a=void 0!==a[b]?a[b]:a.options[b];c.min=Math.min(c.min,a);c.max=Math.max(c.max,a)});return c},{min:Infinity,max:-Infinity})},virtualAxisTranslate:function(c,b,d){var a=b.max-b.min;c=d.min+(d.max-d.min)*(c-b.min)/
a;return 0<a?Math.max(Math.min(c,d.max),d.min):d.min}}}([16.351597831287414,17.323914436054505,18.354047994837977,19.445436482630058,20.601722307054366,21.826764464562746,23.12465141947715,24.499714748859326,25.956543598746574,27.5,29.13523509488062,30.86770632850775,32.70319566257483,34.64782887210901,36.70809598967594,38.890872965260115,41.20344461410875,43.653528929125486,46.2493028389543,48.999429497718666,51.91308719749314,55,58.27047018976124,61.7354126570155,65.40639132514966,69.29565774421802,
73.41619197935188,77.78174593052023,82.4068892282175,87.30705785825097,92.4986056779086,97.99885899543733,103.82617439498628,110,116.54094037952248,123.47082531403103,130.8127826502993,138.59131548843604,146.8323839587038,155.56349186104046,164.81377845643496,174.61411571650194,184.9972113558172,195.99771799087463,207.65234878997256,220,233.08188075904496,246.94165062806206,261.6255653005986,277.1826309768721,293.6647679174076,311.1269837220809,329.6275569128699,349.2282314330039,369.9944227116344,
391.99543598174927,415.3046975799451,440,466.1637615180899,493.8833012561241,523.2511306011972,554.3652619537442,587.3295358348151,622.2539674441618,659.2551138257398,698.4564628660078,739.9888454232688,783.9908719634985,830.6093951598903,880,932.3275230361799,987.7666025122483,1046.5022612023945,1108.7305239074883,1174.6590716696303,1244.5079348883237,1318.5102276514797,1396.9129257320155,1479.9776908465376,1567.981743926997,1661.2187903197805,1760,1864.6550460723597,1975.533205024496,2093.004522404789,
2217.4610478149766,2349.31814333926,2489.0158697766474,2637.02045530296,2793.825851464031,2959.955381693075,3135.9634878539946,3322.437580639561,3520,3729.3100921447194,3951.066410048992,4186.009044809578]),w=function(c,f){var g={};["sine","square","triangle","sawtooth"].forEach(function(b){g[b]=new c({oscillator:{waveformShape:b}});g[b+"Musical"]=new c({allowedFrequencies:f.musicalFrequencies,oscillator:{waveformShape:b}});g[b+"Major"]=new c({allowedFrequencies:f.getMusicalScale([1,3,5,6,8,10,12]),
oscillator:{waveformShape:b}})});return g}(t,r),x=function(c){function f(c){this.init(c||{})}f.prototype.init=function(f){this.options=f;this.options.id||(this.options.id=this.id=c.uniqueKey());this.instrumentsPlaying={}};f.prototype.sonify=function(f){var b=c.merge(this.options,f),d=c.pick(b.volume,1),a=b.pan,e=this,h=f&&f.onEnd,g=e.options.onEnd;b.instruments.forEach(function(b){var f="string"===typeof b.instrument?c.sonification.instruments[b.instrument]:b.instrument,q=c.merge(b.playOptions),k,
p;f&&f.play?b.playOptions&&("function"!==typeof b.playOptions.volume&&(q.volume=c.pick(d,1)*c.pick(b.playOptions.volume,1)),q.pan=c.pick(a,q.pan),k=q.onEnd,q.onEnd=function(){delete e.instrumentsPlaying[p];k&&k.apply(this,arguments);Object.keys(e.instrumentsPlaying).length||(h&&h.apply(this,arguments),g&&g.apply(this,arguments))},b=f.copy(),p=b.id,e.instrumentsPlaying[p]=b,b.play(q)):c.error(30)})};f.prototype.cancelSonify=function(c){var b=this.instrumentsPlaying,d=b&&Object.keys(b);d&&d.length&&
(d.forEach(function(a){b[a].stop(!c,null,"cancelled")}),this.instrumentsPlaying={})};return f}(l),y=function(c,f){var g={minDuration:20,maxDuration:2E3,minVolume:.1,maxVolume:1,minPan:-1,maxPan:1,minFrequency:220,maxFrequency:2200};return{pointSonify:function(b){var d=this,a=d.series.chart,e=b.dataExtremes||{},h=function(a,b,h,g){if("number"===typeof a||void 0===a)return a;if("function"===typeof a)return b?function(c){return a(d,e,c)}:a(d,e);if("string"===typeof a)return e[a]=e[a]||f.calculateDataExtremes(d.series.chart,
a),f.virtualAxisTranslate(c.pick(d[a],d.options[a]),e[a],h,g)};a.sonification.currentlyPlayingPoint=d;d.sonification=d.sonification||{};d.sonification.instrumentsPlaying=d.sonification.instrumentsPlaying||{};var p=d.sonification.signalHandler=d.sonification.signalHandler||new f.SignalHandler(["onEnd"]);p.clearSignalCallbacks();p.registerSignalCallbacks({onEnd:b.onEnd});!d.isNull&&d.visible&&d.series.visible?b.instruments.forEach(function(b){var e="string"===typeof b.instrument?c.sonification.instruments[b.instrument]:
b.instrument,f=b.instrumentMapping||{},k=c.merge(g,b.instrumentOptions),q=e.id,l=function(c){b.onEnd&&b.onEnd.apply(this,arguments);a.sonification&&a.sonification.currentlyPlayingPoint&&delete a.sonification.currentlyPlayingPoint;d.sonification&&d.sonification.instrumentsPlaying&&(delete d.sonification.instrumentsPlaying[q],Object.keys(d.sonification.instrumentsPlaying).length||p.emitSignal("onEnd",c))};e&&e.play?(d.sonification.instrumentsPlaying[e.id]=e,e.play({frequency:h(f.frequency,!0,{min:k.minFrequency,
max:k.maxFrequency}),duration:h(f.duration,!1,{min:k.minDuration,max:k.maxDuration}),pan:h(f.pan,!0,{min:k.minPan,max:k.maxPan}),volume:h(f.volume,!0,{min:k.minVolume,max:k.maxVolume}),onEnd:l,minFrequency:k.minFrequency,maxFrequency:k.maxFrequency})):c.error(30)}):p.emitSignal("onEnd")},pointCancelSonify:function(c){var b=this.sonification&&this.sonification.instrumentsPlaying,a=b&&Object.keys(b);a&&a.length&&(a.forEach(function(a){b[a].stop(!c,null,"cancelled")}),this.sonification.instrumentsPlaying=
{},this.sonification.signalHandler.emitSignal("onEnd","cancelled"))}}}(l,r),A=function(c,f){function g(a,b){return"function"===typeof b?b(a):c.pick(a[b],a.options[b])}function b(c,a){return c.points.reduce(function(c,b){b=g(b,a);c.min=Math.min(c.min,b);c.max=Math.max(c.max,b);return c},{min:Infinity,max:-Infinity})}function d(a,b,d){return(b||[]).reduce(function(c,b){Object.keys(b.instrumentMapping||{}).forEach(function(d){d=b.instrumentMapping[d];"string"!==typeof d||c[d]||(c[d]=f.calculateDataExtremes(a,
d))});return c},c.merge(d))}function a(a,b){return b.reduce(function(b,d){var e=d.earcon;d.condition?(d=d.condition(a),d instanceof c.sonification.Earcon?b.push(d):d&&b.push(e)):d.onPoint&&a.id===d.onPoint&&b.push(e);return b},[])}function e(a){return a.map(function(a){var b=a.instrument,b=("string"===typeof b?c.sonification.instruments[b]:b).copy();return c.merge(a,{instrument:b})})}function h(n,m){var h=m.timeExtremes||b(n,m.pointPlayTime,m.dataExtremes),z=d(n.chart,m.instruments,m.dataExtremes),
p=e(m.instruments),k=n.points.reduce(function(b,d){var e=a(d,m.earcons||[]),n=f.virtualAxisTranslate(g(d,m.pointPlayTime),h,{min:0,max:m.duration});return b.concat(new c.sonification.TimelineEvent({eventObject:d,time:n,id:d.id,playOptions:{instruments:p,dataExtremes:z}}),e.map(function(a){return new c.sonification.TimelineEvent({eventObject:a,time:n})}))},[]);return new c.sonification.TimelinePath({events:k,onStart:function(){if(m.onStart)m.onStart(n)},onEventStart:function(a){var b=a.options&&a.options.eventObject;
if(b instanceof c.Point){if(!b.series.visible&&!b.series.chart.series.some(function(c){return c.visible}))return a.timelinePath.timeline.pause(),a.timelinePath.timeline.resetCursor(),!1;if(m.onPointStart)m.onPointStart(a,b)}},onEventEnd:function(a){var b=a.event&&a.event.options&&a.event.options.eventObject;if(b instanceof c.Point&&m.onPointEnd)m.onPointEnd(a.event,b)},onEnd:function(){if(m.onEnd)m.onEnd(n)}})}function p(a,d,e){var f=e.seriesOptions||{};return c.merge({dataExtremes:d,timeExtremes:b(a,
e.pointPlayTime),instruments:e.instruments,onStart:e.onSeriesStart,onEnd:e.onSeriesEnd,earcons:e.earcons},c.isArray(f)?c.find(f,function(b){return b.id===c.pick(a.id,a.options.id)})||{}:f,{pointPlayTime:e.pointPlayTime})}function q(a,b,d){var e;"sequential"===a||"simultaneous"===a?(e=b.series.reduce(function(a,c){c.visible&&a.push({series:c,seriesOptions:d(c)});return a},[]),"simultaneous"===a&&(e=[e])):e=a.reduce(function(a,e){e=c.splat(e).reduce(function(a,e){var f;if("string"===typeof e){var n=
b.get(e);n.visible&&(f={series:n,seriesOptions:d(n)})}else e instanceof c.sonification.Earcon&&(f=new c.sonification.TimelinePath({events:[new c.sonification.TimelineEvent({eventObject:e})]}));e.silentWait&&(f=new c.sonification.TimelinePath({silentWait:e.silentWait}));f&&a.push(f);return a},[]);e.length&&a.push(e);return a},[]);return e}function l(a,b){return b?a.reduce(function(d,e,f){e=c.splat(e);d.push(e);f<a.length-1&&e.some(function(a){return a.series})&&d.push(new c.sonification.TimelinePath({silentWait:b}));
return d},[]):a}function u(a){return a.reduce(function(a,b){b=c.splat(b);return a+(1===b.length&&b[0].options&&b[0].options.silentWait||0)},0)}function k(a){var b=a.reduce(function(a,c){(c=c.events)&&c.length&&(a.min=Math.min(c[0].time,a.min),a.max=Math.max(c[c.length-1].time,a.max));return a},{min:Infinity,max:-Infinity});a.forEach(function(a){var d=a.events,e=d&&d.length,f=[];e&&d[0].time<=b.min||f.push(new c.sonification.TimelineEvent({time:b.min}));e&&d[d.length-1].time>=b.max||f.push(new c.sonification.TimelineEvent({time:b.max}));
f.length&&a.addTimelineEvents(f)})}function v(a){return a.reduce(function(a,b){return a+c.splat(b).reduce(function(a,c){return(c=c.series&&c.seriesOptions&&c.seriesOptions.timeExtremes)?Math.max(a,c.max-c.min):a},0)},0)}function r(a,b){var d=Math.max(b-u(a),0),e=v(a);return a.reduce(function(a,b){b=c.splat(b).reduce(function(a,b){b instanceof c.sonification.TimelinePath?a.push(b):b.series&&(b.seriesOptions.duration=b.seriesOptions.duration||f.virtualAxisTranslate(b.seriesOptions.timeExtremes.max-
b.seriesOptions.timeExtremes.min,{min:0,max:e},{min:0,max:d}),a.push(h(b.series,b.seriesOptions)));return a},[]);a.push(b);return a},[])}return{chartSonify:function(a){this.sonification.timeline&&this.sonification.timeline.pause();var b=d(this,a.instruments,a.dataExtremes),e=q(a.order,this,function(c){return p(c,b,a)}),e=l(e,a.afterSeriesWait||0),e=r(e,a.duration);e.forEach(function(a){k(a)});this.sonification.timeline=new c.sonification.Timeline({paths:e,onEnd:a.onEnd});this.sonification.timeline.play()},
seriesSonify:function(a){a=h(this,a);var b=this.chart.sonification;b.timeline&&b.timeline.pause();b.timeline=new c.sonification.Timeline({paths:[a]});b.timeline.play()},pause:function(a){this.sonification.timeline?this.sonification.timeline.pause(c.pick(a,!0)):this.sonification.currentlyPlayingPoint&&this.sonification.currentlyPlayingPoint.cancelSonify(a)},resume:function(a){this.sonification.timeline&&this.sonification.timeline.play(a)},rewind:function(a){this.sonification.timeline&&this.sonification.timeline.rewind(a)},
cancel:function(a){this.pauseSonify(a);this.resetSonifyCursor()},getCurrentPoints:function(){var a;return this.sonification.timeline?(a=this.sonification.timeline.getCursor(),Object.keys(a).map(function(b){return a[b].eventObject}).filter(function(a){return a instanceof c.Point})):[]},setCursor:function(a){var b=this.sonification.timeline;b&&c.splat(a).forEach(function(a){b.setCursor(a.id)})},resetCursor:function(){this.sonification.timeline&&this.sonification.timeline.resetCursor()},resetCursorEnd:function(){this.sonification.timeline&&
this.sonification.timeline.resetCursorEnd()}}}(l,r),B=function(c,f){function g(a){this.init(a||{})}function b(a){this.init(a)}function d(a){this.init(a||{})}g.prototype.init=function(a){this.options=a;this.time=a.time||0;this.id=this.options.id=a.id||c.uniqueKey()};g.prototype.play=function(a){var b=this.options.eventObject,d=this.options.onEnd,f=a&&a.onEnd,g=this.options.playOptions&&this.options.playOptions.onEnd;a=c.merge(this.options.playOptions,a);b&&b.sonify?(a.onEnd=d||f||g?function(){var a=
arguments;[d,f,g].forEach(function(b){b&&b.apply(this,a)})}:void 0,b.sonify(a)):(f&&f(),d&&d())};g.prototype.cancel=function(a){this.options.eventObject.cancelSonify(a)};b.prototype.init=function(a){this.options=a;this.id=this.options.id=a.id||c.uniqueKey();this.cursor=0;this.eventsPlaying={};this.events=a.silentWait?[new g({time:0}),new g({time:a.silentWait})]:this.options.events;this.sortEvents();this.updateEventIdMap();this.signalHandler=new f.SignalHandler(["playOnEnd","masterOnEnd","onStart",
"onEventStart","onEventEnd"]);this.signalHandler.registerSignalCallbacks(c.merge(a,{masterOnEnd:a.onEnd}))};b.prototype.sortEvents=function(){this.events=this.events.sort(function(a,b){return a.time-b.time})};b.prototype.updateEventIdMap=function(){this.eventIdMap=this.events.reduce(function(a,b,c){a[b.id]=c;return a},{})};b.prototype.addTimelineEvents=function(a){this.events=this.events.concat(a);this.sortEvents();this.updateEventIdMap()};b.prototype.getCursor=function(){return this.events[this.cursor]};
b.prototype.setCursor=function(a){a=this.eventIdMap[a];return void 0!==a?(this.cursor=a,!0):!1};b.prototype.play=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(1)};b.prototype.rewind=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});
this.playEvents(-1)};b.prototype.resetCursor=function(){this.cursor=0};b.prototype.resetCursorEnd=function(){this.cursor=this.events.length-1};b.prototype.pause=function(a){var b=this;clearTimeout(b.nextScheduledPlay);Object.keys(b.eventsPlaying).forEach(function(c){b.eventsPlaying[c]&&b.eventsPlaying[c].cancel(a)});b.eventsPlaying={}};b.prototype.playEvents=function(a){var b=this,c=b.events[this.cursor],d=b.events[this.cursor+a],f,g=function(a){b.signalHandler.emitSignal("masterOnEnd",a);b.signalHandler.emitSignal("playOnEnd",
a)};c.timelinePath=b;!1===b.signalHandler.emitSignal("onEventStart",c)?g({event:c,cancelled:!0}):(b.eventsPlaying[c.id]=c,c.play({onEnd:function(a){a={event:c,cancelled:!!a};delete b.eventsPlaying[c.id];b.signalHandler.emitSignal("onEventEnd",a);d||g(a)}}),d&&(f=Math.abs(d.time-c.time),1>f?(b.cursor+=a,b.playEvents(a)):this.nextScheduledPlay=setTimeout(function(){b.cursor+=a;b.playEvents(a)},f)))};d.prototype.init=function(a){this.options=a;this.cursor=0;this.paths=a.paths;this.pathsPlaying={};this.signalHandler=
new f.SignalHandler(["playOnEnd","masterOnEnd","onPathStart","onPathEnd"]);this.signalHandler.registerSignalCallbacks(c.merge(a,{masterOnEnd:a.onEnd}))};d.prototype.play=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(1)};d.prototype.rewind=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(-1)};
d.prototype.playPaths=function(a){var b=c.splat(this.paths[this.cursor]),d=this.paths[this.cursor+a],f=this,g=this.signalHandler,l=0,r=function(e){g.emitSignal("onPathStart",e);f.pathsPlaying[e.id]=e;e[0<a?"play":"rewind"](function(h){h=h&&h.cancelled;var k={path:e,cancelled:h};delete f.pathsPlaying[e.id];g.emitSignal("onPathEnd",k);l++;l>=b.length&&(d&&!h?(f.cursor+=a,c.splat(d).forEach(function(b){b[0<a?"resetCursor":"resetCursorEnd"]()}),f.playPaths(a)):(g.emitSignal("playOnEnd",k),g.emitSignal("masterOnEnd",
k)))})};b.forEach(function(a){a&&(a.timeline=f,setTimeout(function(){r(a)},c.sonification.fadeOutTime))})};d.prototype.pause=function(a){var b=this;Object.keys(b.pathsPlaying).forEach(function(c){b.pathsPlaying[c]&&b.pathsPlaying[c].pause(a)});b.pathsPlaying={}};d.prototype.resetCursor=function(){this.paths.forEach(function(a){c.splat(a).forEach(function(a){a.resetCursor()})});this.cursor=0};d.prototype.resetCursorEnd=function(){this.paths.forEach(function(a){c.splat(a).forEach(function(a){a.resetCursorEnd()})});
this.cursor=this.paths.length-1};d.prototype.setCursor=function(a){return this.paths.some(function(b){return c.splat(b).some(function(b){return b.setCursor(a)})})};d.prototype.getCursor=function(){return this.getCurrentPlayingPaths().reduce(function(a,b){a[b.id]=b.getCursor();return a},{})};d.prototype.atStart=function(){return!this.getCurrentPlayingPaths().some(function(a){return a.cursor})};d.prototype.getCurrentPlayingPaths=function(){return c.splat(this.paths[this.cursor])};return{TimelineEvent:g,
TimelinePath:b,Timeline:d}}(l,r);(function(c,f,g,b,d,a,e,h){c.sonification={fadeOutDuration:20,utilities:e,Instrument:f,instruments:g,Earcon:b,TimelineEvent:h.TimelineEvent,TimelinePath:h.TimelinePath,Timeline:h.Timeline};c.Point.prototype.sonify=d.pointSonify;c.Point.prototype.cancelSonify=d.pointCancelSonify;c.Series.prototype.sonify=a.seriesSonify;c.extend(c.Chart.prototype,{sonify:a.chartSonify,pauseSonify:a.pause,resumeSonify:a.resume,rewindSonify:a.rewind,cancelSonify:a.cancel,getCurrentSonifyPoints:a.getCurrentPoints,
setSonifyCursor:a.setCursor,resetSonifyCursor:a.resetCursor,resetSonifyCursorEnd:a.resetCursorEnd,sonification:{}})})(l,t,w,x,y,A,r,B)});
//# sourceMappingURL=sonification.js.map
