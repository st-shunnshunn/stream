const path = require("path");
const APP_ROOT = path.join(__dirname, "../");

module.exports = {
    "appenders": {
        "access": {
            "type":     "dateFile",
            "filename": path.join(APP_ROOT, "./log/system/access.log"),
            "maxLogSize": 5000000, // 5MB
            "backups": 5, // 世代管理は5ファイルまで、古いやつgzで圧縮されていく
            "compress": true
        },
        "error": {
            "type":     "dateFile",
            "filename": path.join(APP_ROOT, "./log/system/error.log"),
            "maxLogSize": 5000000, // 5MB
            "backups": 5, // 世代管理は5ファイルまで、古いやつgzで圧縮されていく
            "compress": true
        },
        "system": {
            "type":     "dateFile",
            "filename":  path.join(APP_ROOT, "./log/system/system.log"),
            "maxLogSize": 5000000, // 5MB
            "backups": 5, // 世代管理は5ファイルまで、古いやつgzで圧縮されていく
            "compress": true
        },
        "console": {
            "type": "console"
        },
        "stdout": {
          "type": "stdout"
        }
    },
    "categories": {
        "default": {
            "appenders": [
                "access"
                ,"console"
                ,"stdout"
            ]
            ,"level": "ALL"
        },
        "access": {
            "appenders": [
                "access"
                ,"console"
                ,"stdout"
            ]
            ,"level": "ALL"
        },
        "system": {
            "appenders": [
                "system"
                ,"console"
                ,"stdout"
            ]
            ,"level": "ALL"
        },
        "error": {
            "appenders": [
                "error"
                ,"console"
                ,"stdout"
            ]
            ,"level": "WARN"
        }
    }
  };