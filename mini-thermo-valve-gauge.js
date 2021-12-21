console.info(`%c THERMO-VALVE-GAUGE \n%c          v0.1-beta `, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');
class ThermoValveGauge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  setConfig(config) {
    if (!config.entity) {
      throw new Error('Please define an entity');
    }
	if (config.temp_max == null) {
		throw new Error('Please define the max config option');
	}
	if (config.temp_min == null) {
		throw new Error('Please define the min config option');
	}
	
    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);

    const cardConfig = Object.assign({}, config);
    if (!cardConfig.scale) cardConfig.scale = "1";

    
    const entityParts = this._splitEntityAndAttribute(cardConfig.entity);
    cardConfig.entity = entityParts.entity;
    if (entityParts.attribute) cardConfig.attribute = entityParts.attribute;

    
    if (config.icon_color !== undefined) {
        var icon_color = config.icon_color;
    } else {
        var icon_color = "var(--paper-item-icon-color)";
    }
	    
    const card = document.createElement('ha-card');
    const content = document.createElement('div');
    const style = document.createElement('style');

    style.textContent = `
      ha-card {
        --base-unit: ${cardConfig.scale};
        height: calc(var(--base-unit)*80px);
        position: relative;
      }
      .container{
        width: calc(var(--base-unit) * 100px);
        height: calc(var(--base-unit) * 80px);
        position: absolute;
        top: 0px;
        left: 50%;
        overflow: hidden;
        text-align: center;
        transform: translate(-50%, -50%);
      }	  
    `;
	
    content.innerHTML = `
    <div class="container">
		<div class="clima-thermo-valve">
		    <svg viewBox="0 0 200 160" style="transform-origin:left top;">
				<g
					 id="thermo"
					 transform="translate(0,-140) scale(1)">
					 
					<clipPath id="clip_target_temperature" style="transform:translateY(0px); transition-duration: 2s">
					<!-- the translateY(y) is about to be dynmically updated -->
						<path d="M 20,144 V 286 H 5 V 144 Z"/ id="clip_g_valve_position">
					</clipPath>
					<clipPath id="clip_current_temperature" style="transform:translateY(0px); transition-duration: 2s">
					<!-- the translateY(y) is about to be dynmically updated -->
						<path d="M 20,144 V 286 H 5 V 144 Z"/ id="clip_g_valve_position">
					</clipPath>
					<clipPath id="clip_valve" style="transform:translateY(0px); transition-duration: 2s">
					<!-- the translateY(y) is about to be dynmically updated -->
						<path d="M 192,144 V 286 H 162 V 144 Z"/ id="clip_g_valve_position">
					</clipPath>
					
					<path
					   style="fill:#000000;stroke:none;fill-opacity:0.2"
					   d="m 196,146 h 5 v 150 H 8 v -5 H 196 Z"
					   id="thermo_g_shade"/>
					<rect
					   style="fill:#ffffff;fill-opacity:0.8;stroke:#000000;stroke-width:2;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
					   id="thermo_g_border"
					   width="194"
					   height="151"
					   x="1"
					   y="140" />
					<path
					   style=""
					   d="M 19,145 V 285 H 13 V 145 Z"
					   id="thermo_g_target_temperature" clip-path="url(#clip_target_temperature)" fill="green"/>
					<path
					   style=""
					   d="M 13,145 V 285 H 6 V 145 Z"
					   id="thermo_g_current_temperature" clip-path="url(#clip_current_temperature)" fill="red"/>
					<path
					   style=""
					   d="M 190,145 V 284 C 182,220 170,189 162,145 Z"
					   id="thermo_g_valve_position" clip-path="url(#clip_valve)" fill="blue"/> 	   
					<text
					   style="font-style:normal;font-weight:normal;font-size:35px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="100"
					   y="192"
					   id="thermo_current_temperature"
					   text-anchor="middle">??.?°C</text>
					<text
					   style="font-style:normal;font-weight:normal;font-size:18px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="100"
					   y="213"
					   id="thermo_target_temperature"
					   text-anchor="middle">??.?°C</text>
					<text
					   style="font-style:normal;font-weight:normal;font-size:21px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="100"
					   y="276"
					   id="thermo_valve_position"
					   text-anchor="middle">??%</text>
					<text
					   style="font-style:normal;font-weight:normal;font-size:23px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="100"
					   y="253"
					   id="thermo_mode"
					   text-anchor="middle">schedule</text>
					<text
					   style="font-style:normal;font-weight:normal;font-size:10px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="180"
					   y="158"
					   id="thermo_g_valve_max"
					   text-anchor="end"">100</text>
					<text
					   style="font-style:normal;font-weight:normal;font-size:10px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="180"
					   y="286"
					   id="thermo_g_valve_min"
					   text-anchor="end"">0</text>
					<text
					   style="font-style:normal;font-weight:normal;font-size:10px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="22"
					   y="154"
					   id="thermo_g_temperature_max"
					   text-anchor="start"">??</text>
					<text
					   style="font-style:normal;font-weight:normal;font-size:10px;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none"
					   x="22"
					   y="286"
					   id="thermo_g_temperature_min"
					   text-anchor="start"">??</text>
				</g>  
			</svg>
		</div>	
	</div>	
	`;
	
    card.appendChild(content);
    card.appendChild(style);
	
    card.addEventListener('click', event => {
      this._fire('hass-more-info', { entityId: cardConfig.entity });
    });
    root.appendChild(card);
    this._config = cardConfig;	
  }

  _splitEntityAndAttribute(entity) {
      let parts = entity.split('.');
      if (parts.length < 3) {
          return { entity: entity };
      }

      return { attribute: parts.pop(), entity: parts.join('.') };
  }

  _fire(type, detail, options) {
    const node = this.shadowRoot;
    options = options || {};
    detail = (detail === null || detail === undefined) ? {} : detail;
    const event = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
  }

  _translateTempHeight(value, config) {
    return 144*(1 - (value - config.temp_min) / (config.temp_max - config.temp_min));
  }

  _translateValveHeight(value) {
    return 144*(1 - (value)/100);
  }

  _getEntityStateValue(entity, attribute) { 
    if (!attribute) {
      return entity.state;
    }

    return entity.attributes[attribute];
  }

  set hass(hass) {
    const root = this.shadowRoot;
    const config = this._config;
    var entityState = this._getEntityStateValue(hass.states[config.entity], config.attribute);
    var maxEntityState = null;
    var minEntityState = null;

    let measurement = "";
    if (config.measurement == null) {
      if (hass.states[config.entity].attributes.unit_of_measurement === undefined) {
        measurement = '';
      } else {
        measurement = hass.states[config.entity].attributes.unit_of_measurement;
      }
    } else {
      measurement = config.measurement;
    }

	root.getElementById("thermo_g_temperature_max").innerHTML = config.temp_max;
	root.getElementById("thermo_g_temperature_min").innerHTML = config.temp_min;
    
  // Set decimal precision
  if (config.decimals !== undefined) {
      // Only allow positive numbers
      if (config.decimals >= 0) {
        entityState = Math.round(parseFloat(entityState) * (10 ** config.decimals)) / (10 ** config.decimals)   // Round (https://stackoverflow.com/a/11832950)
        entityState = entityState.toFixed(config.decimals)  // Add trailing zeroes if applicable        
      }
  }

	if (entityState !== this._entityState) {
	  var current_temperature = this._getEntityStateValue(hass.states[config.entity], "current_temperature");	  
      root.getElementById("thermo_current_temperature").textContent = `${current_temperature}${measurement}`;
      const height = this._translateTempHeight(current_temperature, config);
      root.getElementById("clip_current_temperature").style.transform = `translateY(${height}px)`;

	  var target_temperature = this._getEntityStateValue(hass.states[config.entity], "temperature");	  
      root.getElementById("thermo_target_temperature").textContent = `${target_temperature}${measurement}`;
      const height_target = this._translateTempHeight(target_temperature, config);
      root.getElementById("clip_target_temperature").style.transform = `translateY(${height_target}px)`;
	  
	  var preset_mode = this._getEntityStateValue(hass.states[config.entity], "preset_mode");
      root.getElementById("thermo_mode").textContent = `${preset_mode}`;

	  var valve_position = this._getEntityStateValue(hass.states[config.entity], "position");
      root.getElementById("thermo_valve_position").textContent = `${valve_position}%`;
      const height_valve = this._translateValveHeight(valve_position);
      root.getElementById("clip_valve").style.transform = `translateY(${height_valve}px)`;

      this._entityState = entityState;		
    }
    root.lastChild.hass = hass;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define('thermo-valve-gauge', ThermoValveGauge);