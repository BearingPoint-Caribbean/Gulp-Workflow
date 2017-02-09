const environment = require('./env');

const base = {
	url: 'feb.local',
	root: './',
	cache: './.cache',
	src: './assets',
	build: './assets/build',
	tasks: './gulp/tasks'
};

module.exports = {
	base: base,

	browsersync: {
		server: {
			baseDir: './'
		},
		open: false,
		ui: false,
		notify: true
	},

	clean: {
		dest: [base.build]
	},

	env: environment,

	favicons: {
		colors: {
			fg: '#0094da',
			bg: '#ffffff'
		},
		dest: base.src + '/images/icons',
		src: base.src + '/images/icons/favicon-source.svg',
		json: base.src + '/images/icons/faviconData.json'
	},

	img: {
		base: base.src + '/images',
		all: base.src + '/images/**/*.{svg,png,jpg,gif,webp}',
		dest: base.src + '/images',
		cache: base.cache + '/imagemin'
	},

	js: {
		src: {
			base: base.src + '/js',
			all: base.src + '/js/**/*.js',
			vendor: base.src + '/js/vendor/**/*.js',
			polyfill: base.src + '/js/vendor/polyfill/**/*.js',
			main: base.src + '/js/main.js',
			modulesDir: base.src + '/modules',
		},
		dest: {
			main: base.build + '/js'
		},
		legacy: {
			'assets/js/vendor/esites/vestigo.js': 'vestigo'
		}
	},

	sass: {
		autoprefixer: {
			browsers: ['last 2 versions', 'ios_saf 8']
		},
		src: base.src + '/css/**/*.scss',
		dest: base.build + '/css'
	},

	svg: {
		src: base.src + '/svg/*.svg',
		dest: base.build + '/svg'
	},

	sw: {
		root: base.root
	}
};