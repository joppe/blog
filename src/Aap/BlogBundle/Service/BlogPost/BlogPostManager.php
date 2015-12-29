<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Service\BlogPost;

use Aap\BlogBundle\Entity\Repository\BlogRepository;
use Aap\BlogBundle\Entity\BlogPost;

/**
 * Class BlogPostManager
 *
 * @package Aap\BlogBundle\Service\BlogPost
 */
class BlogPostManager
{
    /**
     * @var BlogRepository
     */
    private $repository;

    /**
     * BlogPost constructor.
     *
     * @param BlogRepository $repository
     */
    public function __construct(BlogRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $slug
     * @return BlogPost
     */
    public function getPostBySlug($slug)
    {
        return $this->repository->findBySlug($slug);
    }

    /**
     * @return array
     */
    public function getAllPosts()
    {
        return $this->repository->getAll();
    }

    /**
     * @return BlogPost
     */
    public function getLastPost()
    {
        $all = $this->repository->getAll();

        return reset($all);
    }
}