<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Parsing;

/**
 * Class Token
 */
class Token
{
    /**
     * @var string
     */
    private $type;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $text;

    /**
     * Lexer constructor.
     *
     * @param string $type
     * @param string $name
     * @param string $text
     */
    public function __construct($type, $name, $text)
    {
        $this->type = $type;
        $this->name = $name;
        $this->text = $text;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return sprintf('<"%s":"%s">', $this->name, $this->text);
    }
}