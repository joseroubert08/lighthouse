"use strict";require("../base/extension_registry.js");'use strict';global.tr.exportTo('tr.model',function(){function EventRegistry(){}var options=new tr.b.ExtensionRegistryOptions(tr.b.BASIC_REGISTRY_MODE);tr.b.decorateExtensionRegistry(EventRegistry,options);EventRegistry.addEventListener('will-register',function(e){var metadata=e.typeInfo.metadata;if(metadata.name===undefined)throw new Error('Registered events must provide name metadata');if(metadata.pluralName===undefined)throw new Error('Registered events must provide pluralName metadata');if(metadata.subTypes===undefined){metadata.subTypes={};var options=new tr.b.ExtensionRegistryOptions(tr.b.TYPE_BASED_REGISTRY_MODE);options.mandatoryBaseClass=e.typeInfo.constructor;options.defaultConstructor=e.typeInfo.constructor;tr.b.decorateExtensionRegistry(metadata.subTypes,options);}else{if(!metadata.subTypes.register)throw new Error('metadata.subTypes must be an extension registry.');}e.typeInfo.constructor.subTypes=metadata.subTypes;});var eventsByTypeName=undefined;EventRegistry.getEventTypeInfoByTypeName=function(typeName){if(eventsByTypeName===undefined){eventsByTypeName={};EventRegistry.getAllRegisteredTypeInfos().forEach(function(typeInfo){eventsByTypeName[typeInfo.metadata.name]=typeInfo;});}return eventsByTypeName[typeName];};EventRegistry.addEventListener('registry-changed',function(){eventsByTypeName=undefined;});function convertCamelCaseToTitleCase(name){var result=name.replace(/[A-Z]/g,' $&');result=result.charAt(0).toUpperCase()+result.slice(1);return result;}EventRegistry.getUserFriendlySingularName=function(typeName){var typeInfo=EventRegistry.getEventTypeInfoByTypeName(typeName);var str=typeInfo.metadata.name;return convertCamelCaseToTitleCase(str);};EventRegistry.getUserFriendlyPluralName=function(typeName){var typeInfo=EventRegistry.getEventTypeInfoByTypeName(typeName);var str=typeInfo.metadata.pluralName;return convertCamelCaseToTitleCase(str);};return{EventRegistry:EventRegistry};});