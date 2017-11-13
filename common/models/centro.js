'use strict';

module.exports = function(Centro) {
	Centro.validatesNumericalityOf('codigocentro', {int: true, message: 'Debe ser un número sin decimales'});
	Centro.validatesUniquenessOf('codigocentro', {message: 'Ese centro ya existe'});
	//var url = 'http://' + config.host + ':' + config.port + '/reset-password';
	var html = 'Te Has REgistrado';

	Centro.beforeRemote('create', function(context, centro, next) {
		centro.verificado=false;
	});

	Centro.afterRemote('create', function(context, centro, next) {
		    Centro.app.models.Email.send({
			to: process.env.ADMIN_EMAIL,
			from: process.env.EMAIL_USER,
			subject: 'Alta de Centro',
			html: html
		  }, function(err) {
			if (err) return console.log('> error al Enviado correctamente');
			console.log('> Se Ha Enviado correctamente');
		  });
		  next();
});
};


