var host = "weather.oskarklintrot.se"

if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https"
