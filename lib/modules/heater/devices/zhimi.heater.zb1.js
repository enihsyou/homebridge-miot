const HeaterDevice = require('../HeaterDevice.js');
const HeaterCapabilities = require('../HeaterCapabilities.js');
const HeaterProperties = require('../HeaterProperties.js');
const Constants = require('../../../constants/Constants.js');

// Spec:
// http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:heater:0000A01A:zhimi-zb1:1


class ZhimiHeaterZb1 extends HeaterDevice {
  constructor(miioDevice, model, deviceId, name, logger) {
    super(miioDevice, model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    this.addProperty(HeaterProperties.POWER, 2, 2, 'bool', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.TARGET_TEMPERATURE, 2, 6, 'float', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.POWER_OFF_TIME, 4, 1, 'uint32', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.CHILD_LOCK, 7, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.LIGHT, 6, 1, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.ALARM, 3, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.COUNTRY_CODE, 8, 8, 'int32', ['read', 'write', 'notify']);

    this.addProperty(HeaterProperties.RELATIVE_HUMIDITY, 5, 7, 'uint8', ['read', 'notify']);
    this.addProperty(HeaterProperties.TEMPERATURE, 5, 8, 'float', ['read', 'notify']);
    this.addProperty(HeaterProperties.USE_TIME, 8, 7, 'uint32', ['read', 'notify']);
  }

  initDeviceCapabilities() {
    this.addCapability(HeaterCapabilities.TARGET_TEMPERATURE_RANGE, [16, 28, 1]);
    this.addCapability(HeaterCapabilities.POWER_OFF_TIMER_UNIT, Constants.TIME_UNIT_HOURS);
    this.addCapability(HeaterCapabilities.POWER_OFF_TIMER_RANGE, [0, 8, 1]);
    this.addCapability(HeaterCapabilities.USE_TIME_UNIT, Constants.TIME_UNIT_SECONDS);
  }


  /*----------========== STATUS ==========----------*/

  isLedEnabled() {
    return this.getPropertyValue(Properties.LIGHT) !== 2;
  }


  /*----------========== COMMANDS ==========----------*/

  async setLedEnabled(enabled) {
    let level = enabled ? 0 : 2;
    this.setPropertyValue(Properties.LIGHT, level);
  }


}

module.exports = ZhimiHeaterZb1;