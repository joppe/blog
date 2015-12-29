<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Entity\Factory;

use Aap\BlogBundle\Entity\BlogPost;
use DateTime;
use Parsedown;

/**
 * Class BlogFactory
 *
 * @package Aap\BlogBundle\Entity\Factory
 */
class BlogFactory
{
    /**
     * @var string
     */
    private $rootDir;

    /**
     * BlogFactory constructor.
     *
     * @param $rootDir
     */
    public function __construct($rootDir)
    {
        $this->rootDir = $rootDir;
    }

    /**
     * Create a Blog entity from an array
     *
     * @param array $data
     * @return BlogPost
     */
    public function fromArray($data)
    {
        $blogPost = new BlogPost();
        $path = sprintf('%s/%s', $this->rootDir, $data['md']);
        $md = file_get_contents($path);
        $text = Parsedown::instance()->text($md);

        $blogPost
            ->setDate(DateTime::createFromFormat('U', $data['date']))
            ->setKeywords($data['keywords'])
            ->setText($text)
            ->setTitle($data['title'])
            ->setSlug($data['slug'])
            ->setDescription($data['description'])
        ;

        return $blogPost;
    }
}