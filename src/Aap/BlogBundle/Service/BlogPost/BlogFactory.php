<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Service\BlogPost;

use Aap\BlogBundle\Entity\Post;
use DateTime;
use DOMDocument;
use Parsedown;

/**
 * Class BlogFactory
 *
 * @package Aap\BlogBundle\Service\BlogPost
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
     * @param array $array
     * @return Post
     */
    public function fromArray($array)
    {
        $blog = new Post();
        $path = sprintf('%s/%s', $this->rootDir, $array['md']);
        $md = file_get_contents($path);
        $html = Parsedown::instance()->text($md);
        $title = $this->getTitleFromHtml($html);

        $blog
            ->setDate(DateTime::createFromFormat('U', $array['date']))
            ->setKeywords($array['keywords'])
            ->setText($html)
            ->setTitle($title)
        ;

        return $blog;
    }

    /**
     * @param string $html
     * @return string
     */
    private function getTitleFromHtml($html)
    {
        $title = '';
        $matches = array();
        $pattern = '/<h1>([^\<]*)/im';

        if (1 === preg_match($pattern, $html, $matches)) {
            $title = $matches[1];
        }

        return $title;
    }
}