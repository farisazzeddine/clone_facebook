<?php

namespace App\Exceptions;

use Exception;

class FriendRequestNotFoundException extends Exception
{
    /**
     * Render the exception as an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request)
    {
        return response()->json([
            'errors'=>[
                'code'      =>404,
                'title'     =>'Friend request Not Found',
                'detail'    =>'Unable to locate the Friend request with the  given information.',

            ]
        ],404);
    }
}
