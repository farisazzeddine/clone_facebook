<?php





Route::prefix('admin')->group(function(){
    Route::get('/', 'AdminController@index')->name('admin.dashboard');
    Route::get('/login','Auth\AdminLoginController@showLoginForm')->name('admin.login');
    Route::post('/login','Auth\AdminLoginController@login')->name('admin.login.submit');
});

Auth::routes();

Route::get('{any}', 'AppController@index')
       ->where('any','.*')
       ->middleware('auth')
       ->name('home');
