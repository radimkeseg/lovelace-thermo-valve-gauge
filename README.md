# Lovelace tempometer-gauge-card

A Home Assistant lovelace custom gauge card for barometer, thermometer, humidity meter or anything you want with custom icons.

![pressure-and-temp](https://user-images.githubusercontent.com/25659602/106396921-2dc16900-640b-11eb-9921-baabe2fdb378.png)
![humidity-and-custom](https://user-images.githubusercontent.com/25659602/106397020-a9231a80-640b-11eb-882e-3b38cde7fa69.png)

## Usage
Add this card via HACS (recommended)

Or manually :
Add this custom card to your home assistant instance. Reference it into your lovelace configuration.
```
  - type: js
    url: /local/lovelace/mini-thermo-valve-gauge.js
```

Finally :
Add it as a custom card to your lovelace : `'custom:thermo-valve-gauge'`.

