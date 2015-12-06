<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Service\BlogPost;

use Symfony\Component\Yaml\Yaml;
use Aap\BlogBundle\Entity\Post;

/**
 * Class BlogPost
 *
 * @package Aap\BlogBundle\Service\BlogPost
 */
class BlogPost
{
    /**
     * @var BlogFactory
     */
    private $factory;

    /**
     * @var array
     */
    private $posts;

    /**
     * BlogPost constructor.
     *
     * @param string $factory
     * @param string $postsFile
     */
    public function __construct($factory, $postsFile)
    {
        $this->factory = $factory;
        $this->posts = Yaml::parse(file_get_contents($postsFile));
    }

    /**
     * @return Post
     */
    public function getLastPost()
    {
        $config = end($this->posts['posts']);

        return $this->factory->fromArray($config);
    }
}