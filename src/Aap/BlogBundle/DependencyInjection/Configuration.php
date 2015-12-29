<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();

        $rootNode = $treeBuilder->root('aap_blog');
        $rootNode
            ->children()
                ->arrayNode('posts')
                    ->prototype('array')
                        ->children()
                            ->scalarNode('date')->end()
                            ->scalarNode('slug')->end()
                            ->scalarNode('title')->end()
                            ->scalarNode('description')->end()
                            ->arrayNode('keywords')
                                ->prototype('scalar')->end()
                            ->end()
                            ->scalarNode('md')->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $treeBuilder;
    }
}
