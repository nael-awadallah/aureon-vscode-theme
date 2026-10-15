<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Handles user endpoints.
 */
class UserController extends Controller
{
    private const PER_PAGE = 20;

    public function __construct(private readonly UserService $users)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $query = User::query()->where('active', true);

        if ($search = $request->string('q')->trim()) {
            $query->where('name', 'like', "%{$search}%");
        }

        return response()->json($query->paginate(self::PER_PAGE));
    }

    #[Route('/users/{id}')]
    public function show(int $id): JsonResponse
    {
        return response()->json($this->users->find($id) ?? abort(404));
    }
}
