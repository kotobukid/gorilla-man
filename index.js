"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var process_1 = __importDefault(require("process"));
var fs_1 = __importDefault(require("fs"));
var underscore_1 = __importDefault(require("underscore"));
var ioredis_1 = __importDefault(require("ioredis"));
var client = new discord_js_1.default.Client();
var UNDELETABLE_CHANNELS = ['一般', 'another'];
var redis = new ioredis_1.default();
var token = '';
if (fs_1.default.existsSync('./config/secret.js')) {
    token = require('./config/secret');
    if (!token) {
        console.error('secret.js empty.');
        process_1.default.exit(1);
    }
}
else {
    console.error('./config/secret.js not found.');
    process_1.default.exit(1);
}
var category = {
    text: '',
    voice: ''
};
if (fs_1.default.existsSync('./config/category.js')) {
    category = require('./config/category');
    if (!token) {
        console.error('category.js empty.');
        process_1.default.exit(1);
    }
}
else {
    console.error('./config/category.js not found.');
    process_1.default.exit(1);
}
var notice_channel = '';
client.on('ready', function () {
    var e_1, _a;
    try {
        for (var _b = __values(client.channels.cache), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (value.name === '一般' && value.type === 'text') {
                notice_channel = key;
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log(client.user.tag + " \u3067\u30ED\u30B0\u30A4\u30F3");
});
// @ts-ignore
client.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var texts, _channel_name, channel_name_1, name_1, _a, _b, _c, key, value;
    var e_2, _d;
    return __generator(this, function (_e) {
        if (msg.author.bot) {
            return [2 /*return*/];
        }
        else if (msg.content === '!ping') {
            msg.channel.send('Pong!').then();
        }
        else if (msg.content === '!logout') {
            msg.channel.send("I'll be back").then();
            console.log("I'll be back");
            setTimeout(function () {
                client.destroy();
                process_1.default.exit();
            }, 2500);
        }
        else if (msg.content.startsWith('mkch')) { // チャンネルを作成する
            texts = msg.content.replace(/　/ig, ' ');
            _channel_name = texts.split(' ');
            if (_channel_name.length > 1) {
                channel_name_1 = _channel_name[1];
                msg.guild.channels.create(channel_name_1, {
                    type: 'text',
                    parent: category.text
                }).then(function () {
                    msg.guild.channels.create(channel_name_1, {
                        type: 'voice',
                        parent: category.voice
                    });
                })
                    .catch(function (err) {
                    console.log(err);
                });
            }
        }
        else if (msg.content === 'delch') {
            name_1 = msg.channel.name;
            try {
                for (_a = __values(client.channels.cache), _b = _a.next(); !_b.done; _b = _a.next()) {
                    _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                    if (value.name === name_1) {
                        if (underscore_1.default.include(UNDELETABLE_CHANNELS, name_1)) {
                            break;
                        }
                        if ((value.type === 'text') || (value.type === 'voice')) {
                            value.delete().then();
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return [2 /*return*/];
    });
}); });
redis.subscribe('inspect').then(function () {
    redis.on('message', function (channel, message) {
        if (channel === 'inspect') {
            var channel_1 = client.channels.cache.get(notice_channel);
            if (channel_1) {
                channel_1.send(message).then();
            }
            else {
                console.error("target channel not found: " + notice_channel);
            }
        }
    });
});
client.login(token).then(function () {
});
