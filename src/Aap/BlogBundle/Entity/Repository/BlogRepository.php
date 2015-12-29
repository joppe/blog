<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Entity\Repository;

use Aap\BlogBundle\Entity\BlogPost;
use Aap\BlogBundle\Entity\Factory\BlogFactory;
use InvalidArgumentException;

/**
 * Class BlogRepository
 *
 * @package Aap\BlogBundle\Entity\Repository
 */
class BlogRepository
{
    /**
     * @var BlogFactory
     */
    private $factory;

    /**
     * @var array
     */
    private $posts = array();

    /**
     * BlogRepository constructor.
     *
     * @param BlogFactory $factory
     */
    public function __construct(BlogFactory $factory)
    {
        $this->factory = $factory;
    }

    /**
     * @param array $data
     * @return void
     */
    public function setData($data)
    {
        foreach ($data as $d) {
            /** @var BlogPost $post */
            $post = $this->factory->fromArray($d);

            $this->posts[$post->getSlug()] = $post;
        }
    }

    /**
     * @return array
     */
    public function getAll()
    {
        return $this->posts;
    }

    /**
     * Find a blog post by it's slug
     *
     * @param string $slug
     * @return BlogPost
     */
    public function findBySlug($slug)
    {
        if (!isset($this->posts[$slug])) {
            throw new InvalidArgumentException("Can not find post by slug '$slug.'");
        }

        return $this->posts[$slug];
    }
}