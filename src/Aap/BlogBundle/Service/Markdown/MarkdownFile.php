<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Service\Markdown;

/**
 * Class MarkdownFile
 *
 * @package Aap\BlogBundle\Service\Markdown
 */
class MarkdownFile extends \SplFileInfo
{
    /**
     * @return string
     */
    public function getContents()
    {
        return file_get_contents($this->getPathname());
    }
}