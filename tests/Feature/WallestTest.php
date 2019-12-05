<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class WallestTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetWallet()
    {
        $response = $this->json('GET', '/api/wallet');

        $response->assertStatus(200)
                ->asertJsonStructure();
    }
}
