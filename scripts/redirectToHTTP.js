var host = "weather.oskarklintrot.se"

if ((host == window.location.host) && (window.location.protocol != "http:"))
    window.location.protocol = "http"
